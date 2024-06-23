import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { getExchangeRates } from "../utils/getExchangeRates";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [balanceInUSD, setBalanceInUSD] = useState("");
  const [balanceInNGN, setBalanceInNGN] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async (account) => {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);
      setCurrentBalance(formattedBalance);

      // Fetch exchange rates and calculate balances in USD and NGN
      const exchangeRates = await getExchangeRates();
      setBalanceInUSD((formattedBalance * exchangeRates.usd).toFixed(2));
      setBalanceInNGN((formattedBalance * exchangeRates.ngn).toFixed(2));
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getBalance(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      getBalance(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const disconnectWallet = async () => {
    try {
      setCurrentAccount("");
      setCurrentBalance("");
      setBalanceInUSD("");
      setBalanceInNGN("");
      window.localStorage.removeItem("currentAccount");
      window.localStorage.removeItem("transactionCount");
      alert("Wallet disconnected");
    } catch (error) {
      console.log(error);
      throw new Error("Error disconnecting wallet");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        console.log("Initiating transaction...");

        const txParams = {
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 Gwei
          value: parsedAmount._hex,
        };

        // Send transaction
        const txHash = await ethereum.request({
          method: "eth_sendTransaction",
          params: [txParams],
        });

        console.log(`Transaction sent: ${txHash}`);

        // Assuming the contract method `addToBlockchain` expects four arguments
        const keyword = "sent"; // Add a default or appropriate value for the fourth argument
        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword // Fourth argument added here
        );

        setIsLoading(true);
        console.log(`Transaction hash: ${transactionHash.hash}`);

        // Wait for the transaction to be mined
        await transactionHash.wait();

        console.log(`Transaction mined: ${transactionHash.hash}`);
        setIsLoading(false);

        // Update state and notify user
        const transactionsCount =
          await transactionsContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());
        getAllTransactions();
        getBalance(currentAccount);
        alert("Transaction successful!");
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        transactions,
        currentAccount,
        currentBalance,
        balanceInUSD,
        balanceInNGN,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

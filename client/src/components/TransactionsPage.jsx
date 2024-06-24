import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionsPage = () => {
  const { transactions, isLoading, getAllTransactions } =
    useContext(TransactionContext);

  useEffect(() => {
    // Fetch transactions initially
    getAllTransactions();
  }, [getAllTransactions]); // Only fetch once on component mount

  return (
    <div>
      <h1>Transactions</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Timestamp</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.addressFrom}</td>
                  <td>{transaction.addressTo}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.timestamp}</td>
                  <td>{transaction.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;

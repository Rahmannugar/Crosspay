// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address indexed from, address indexed receiver, uint256 amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    mapping(uint256 => TransferStruct) transactions;

    function addToBlockchain(address payable receiver, uint256 amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions[transactionCount] = TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword);

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        TransferStruct[] memory allTransactions = new TransferStruct[](transactionCount);

        for (uint256 i = 1; i <= transactionCount; i++) {
            allTransactions[i - 1] = transactions[i];
        }

        return allTransactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}

import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { Clock, ArrowRight, ExternalLink, Search } from "lucide-react";

const TransactionHistory = ({ darkMode }) => {
  const { transactions } = useWeb3();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.addressFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.addressTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`card ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
      <div className="card-body">
        <h2 className="card-title mb-4">
          Transaction History
        </h2>
        <div className="mb-4">
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`form-control ${darkMode ? "bg-dark text-white" : "bg-light"}`}
            />
            <Search
              className={`position-absolute top-50 start-0 translate-middle-y ${
                darkMode ? "text-muted" : "text-secondary"
              }`}
              size={20}
            />
          </div>
        </div>
        {currentTransactions.length === 0 ? (
          <p className={`text-muted ${darkMode ? "text-light" : ""}`}>
            No transactions found.
          </p>
        ) : (
          <ul className="list-unstyled">
            {currentTransactions.map((tx, index) => (
              <li
                key={index}
                className={`border-bottom ${darkMode ? "border-dark" : "border-light"} pb-4 mb-4`}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <Clock
                      size={18}
                      className={darkMode ? "text-muted" : "text-secondary"}
                    />
                    <span className={`ms-2 ${darkMode ? "text-muted" : "text-secondary"}`}>
                      {tx.timestamp}
                    </span>
                  </div>
                  <span className="text-primary">
                    {tx.amount} ETH
                  </span>
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <span className="text-truncate" style={{ maxWidth: "150px" }}>
                    {tx.addressFrom}
                  </span>
                  <ArrowRight
                    size={16}
                    className={darkMode ? "text-muted" : "text-secondary"}
                  />
                  <span className="text-truncate" style={{ maxWidth: "150px" }}>
                    {tx.addressTo}
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>
                    Keyword:{" "}
                  </span>
                  <span className={`${darkMode ? "text-muted" : "text-secondary"}`}>
                    {tx.keyword}
                  </span>
                </div>
                <div className="mt-1">
                  <span className={`fw-medium ${darkMode ? "text-light" : "text-dark"}`}>
                    Message:{" "}
                  </span>
                  <span className={`${darkMode ? "text-muted" : "text-secondary"}`}>
                    {tx.message}
                  </span>
                </div>
                <div className="mt-2">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary d-flex align-items-center"
                  >
                    View on Etherscan
                    <ExternalLink size={14} className="ms-1" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
        {filteredTransactions.length > transactionsPerPage && (
          <div className="mt-4 d-flex justify-content-center">
            {Array.from(
              {
                length: Math.ceil(filteredTransactions.length / transactionsPerPage),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"} mx-1`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

import React, { useState } from "react";
import { useWeb3 } from "../contexts/Web3Context";
import { Send } from "lucide-react";

const TransactionForm = ({ darkMode }) => {
  const { sendTransaction, balance } = useWeb3();
  const [formData, setFormData] = useState({
    to: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.to) newErrors.to = "Recipient address is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (parseFloat(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (parseFloat(formData.amount) > parseFloat(balance))
      newErrors.amount = "Insufficient balance";
    if (!formData.keyword) newErrors.keyword = "Keyword is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendTransaction(
          formData.to,
          formData.amount,
          formData.keyword,
          formData.message
        );
        setFormData({ to: "", amount: "", keyword: "", message: "" });
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };

  const setMaxAmount = () => {
    setFormData({ ...formData, amount: balance });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-dark text-white" : "bg-light"
      } p-4 rounded shadow mb-4`}
    >
      <h2 className="h3 mb-4">Send Transaction</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label
            htmlFor="to"
            className="form-label"
          >
            Recipient Address
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className={`form-control ${
              darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          />
          {errors.to && (
            <div className="text-danger mt-2">{errors.to}</div>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="amount"
            className="form-label"
          >
            Amount (ETH)
          </label>
          <div className="input-group">
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.0001"
              min="0"
              className={`form-control ${
                darkMode ? "bg-dark text-white" : "bg-white text-dark"
              }`}
            />
            <button
              type="button"
              onClick={setMaxAmount}
              className="btn btn-outline-secondary"
            >
              Max
            </button>
          </div>
          {errors.amount && (
            <div className="text-danger mt-2">{errors.amount}</div>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="keyword"
            className="form-label"
          >
            Keyword
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            className={`form-control ${
              darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          />
          {errors.keyword && (
            <div className="text-danger mt-2">{errors.keyword}</div>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="message"
            className="form-label"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className={`form-control ${
              darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          ></textarea>
          {errors.message && (
            <div className="text-danger mt-2">{errors.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
        >
          <Send className="me-2" size={18} />
          Send Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

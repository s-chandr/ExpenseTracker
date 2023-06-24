import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);
  const alltransactions = transactions.map((transaction) => transaction.amount);
  const total = alltransactions
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const [amount, setAmount] = useState(0);
  const [text, setText] = useState("");

  const notify = (text) => {
    toast(
      `Don't be too hard on your pocket \n Delete the last transaction of $ ${text} `
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount, // saving it as number
    };
    addTransaction(newTransaction);
    if (+total + +amount < 0) {
      notify(+amount);
    }
  };
  return (
    <div>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            id="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label HtmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>

          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

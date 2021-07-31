import React,{useContext,useState}  from 'react'
import { GlobalContext } from "../context/GlobalState";

export const Incomeexpenses = () => {
    const {transactions} = useContext(GlobalContext);
    const alltransactions = transactions.map( transaction => transaction.amount);
    // const total = alltransactions.reduce((acc, item )=> (acc+=item) , 0).toFixed(2);
    const  expenses = alltransactions.filter(item => item < 0 ).reduce((acc, item )=> (acc+=item) , 0).toFixed(2);
    const  income = alltransactions.filter(item => item > 0 ).reduce((acc, item )=> (acc+=item) , 0).toFixed(2);
    
    return (
        
        <div className="inc-exp-container">
        
        <div> 
          <h4>Income</h4>
          <p id="money-plus" className="money plus">${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">${expenses}</p>
        </div>
      </div>
    )
}

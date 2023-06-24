import React,{useContext , useEffect} from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transactions } from "./Transactions";

export const TransactionList = () => {
    const {transactions , getTransactions} = useContext(GlobalContext);
    useEffect(()=>{
      getTransactions();
      
    },[])
    return (
        <>
      <h3>History</h3>
      <ul id="list" className="list">
          {transactions.map(transaction => (
              <Transactions  key = {transaction.id} transaction ={transaction}  />
          ))
          }
        
      </ul>
    </>
  );
};

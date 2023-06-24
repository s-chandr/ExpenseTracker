import React , {createContext , useReducer}from 'react';
import axios from 'axios';
import AppReducer from './AppReducer'

// Initial State
const initialState1 = {
    transactions: [    

        // { id: 1, text: 'Flower', amount: -20 },
        // { id: 2, text: 'Salary', amount: 300 },
        // { id: 3, text: 'Book', amount: -10 },
        // { id: 4, text: 'Camera', amount: 150 }
        
    ],
    error: null,
    loading: true
}
    //create  global context  
export const GlobalContext = createContext(initialState1);

    // create provider component 
export const GlobalProvider = ({ children }) => {
    const [state,dispatch] = useReducer(AppReducer,initialState1);
    //we use despatch when we have reducer
    
        ///https://reactjs.org/docs/hooks-reference.html#usereducer study for more details 
        
    //Actions make calls to our reducer 

    async function getTransactions(){
        try{
            const res = await axios.get('/api/v1/transactions/');
            dispatch({
                type:'GET_TRANSACTIONS',
                payload:res.data.data
            })
        }
        catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            })
        }
    } 
    async function deleteTransaction(id){
        try{
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type:'DELETE_TRANSACTION', 
                payload:id
            });
        }
        catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            });
        }
         
    }
    async function addTransaction(transaction){
        try{
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }

            };
            const res = await axios.post(`/api/v1/transactions`, transaction , config);
            
            dispatch({
                type:'ADD_TRANSACTION',
                payload:res.data.data
            })
        }
        catch(err){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:err.response.data.error
            });
        }
        
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        getTransactions,
        error:state.error,
        loading:state.loading,
        deleteTransaction,
        addTransaction
        }}>
        {children}
    </GlobalContext.Provider>);

}
// its basically how we specify the application state changes in response to certain action to our context
export default (state,action ) =>{
    switch(action.type)
    {   
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading:false,
                transactions: action.payload
                
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload )
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions:[  ...state.transactions,action.payload ]
                // transactions: state.transactions.push({payload})
                
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
                
            }
        default:
            return state;
    }
}
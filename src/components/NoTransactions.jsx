import React from 'react';
import transactions from '../assets/CreditCard.svg';

const NoTransactions = () => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            marginBottom: "2rem",
        }}
    
    >
        <img src={transactions} style={{ width: "300px", margin: "4rem"}} />
        <p style={{ textAlign: "center", fontSize: "1.2rem"}}>Currently You Have No Transactions </p>
      
    </div>
  )
}

export default NoTransactions;

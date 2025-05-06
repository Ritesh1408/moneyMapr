import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Cards from '../components/cards';
import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionTable';
import Chartcomponent from '../components/Charts';
import NoTransactions from '../components/NoTransactions';

const Dashboard = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        } else {
          setUserName("User"); 
        }
      } else {
        setUserName("User");
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseModalCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeModalCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    console.log('Received values:', values, type);
    // Handle the form submission logic here
    // You can send the data to your backend or perform any other actions

    const newTransaction = {
      type: type,
      amount: parseFloat(values.amount),
      date: (values.date).format('YYYY-MM-DD'),
      tag: values.category,
      name: values.name,
    };
    addTransaction(newTransaction); 

    if (type === "income") {
      handleIncomeModalCancel();
    } else {
      handleExpenseModalCancel();
    }
  }

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user?.uid}/transactions`), transaction
      );
      console.log("Transaction added with ID: ", docRef.id);
      if(!many) toast.success("Transaction added successfully!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (error) {
      console.error("Error adding transaction: ", error);
      if(!many)  toast.error("Coudn't add transaction. Please try again later.");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions, income, expense, totalBalance]);

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpense += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
    console.log("Income: ", totalIncome, "Expense: ", totalExpense, "Balance: ", totalBalance);
  };

  async function fetchTransactions() {
    setLoading(true);
    if(user){
      const q = query(collection(db, `users/${user?.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArr = [];
      querySnapshot.forEach((doc) => {
        transactionsArr.push(doc.data());
      });
      setTransactions(transactionsArr);
      console.log("transactions ",transactionsArr);
      toast.success("Transactions fetched successfully!");
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div>
      <Header/>
      <div className='dash-head' style={{ marginTop: "20px", marginBottom: "-30px" }}>
        <h1>
          Welcome Back <span style={{ color: "var(--theme)" }}>{userName ? userName : "User"}!</span>
        </h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />

          {transactions.length !== 0 ? (
            <Chartcomponent sortedTransactions={sortedTransactions}/>)
               : (<NoTransactions />)}


          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseModalCancel={handleExpenseModalCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeModalCancel={handleIncomeModalCancel}
            onFinish={onFinish}
          />
          <TransactionsTable 
          transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}
          />
        </>
      )}

    </div>
  )
}

export default Dashboard;

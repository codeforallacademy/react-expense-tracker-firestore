import React, { Fragment, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import './App.css';

const App = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getAllTransactions();
    }, []);

    const getAllTransactions = () => {
        fetch('https://your-firestore-api.com/api/getexpenses').then(data => {
            setTransactions(data);
        }).catch(err => {
            console.error(`Error on adding transaction :: ${err}`)
        })
    }

    const addTransaction = (transaction) => {        
        fetch('https://your-firestore-api.com/api/saveexpense', {
            method: "post",
            body: transaction
        }).then(data => {
            getAllTransactions();
        }).catch(err => {
            console.error(`Error on adding transaction :: ${err}`)
        });
    };

    const deleteTransaction = (id) => {
        fetch(`https://your-firestore-api.com/api/deleteexpense?id=${id}`, {
            method: "delete",
        }).then(data => {
            getAllTransactions();
        }).catch(err => {
            console.error(`Error on adding transaction :: ${err}`)
        })
    };

    return (
        <Fragment>
            <Header />
            <div className="container">
                <Balance transactions={transactions}/>
                <IncomeExpenses transactions={transactions}/>
                <TransactionList transactions={transactions} deleteTransaction={deleteTransaction}/>
                <AddTransaction addTransaction={addTransaction}/>
            </div>
        </Fragment>
    );
}

export default App;

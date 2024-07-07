import React, { useState } from 'react';

const Header = ({ income, expense }) => {
    return (
        <div className='w-full flex justify-between p-4 bg-blue-300 text-white'>
            <div>
                <p>Income: ${income}</p>
            </div>
            <div>
                <p>Expense: ${expense}</p>
            </div>
            <div>
                <p>Net Income: ${income - expense}</p>
            </div>
        </div>
    )
}

const Tracker = () => {
    const [activeAddTab, setActiveAddTab] = useState('income');
    const [activeFilterTab, setActiveFilterTab] = useState('all');
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleShowTransactionForm = () => {
        setShowTransactionForm(prev => !prev);
    }

    const handleAddIncome = (e) => {
        e.preventDefault();
        const newIncome = parseFloat(amount);
        if (!isNaN(newIncome) && newIncome > 0) {
            setIncome(income + newIncome);
            setTransactions([...transactions, { type: 'income', amount: newIncome }]);
            setAmount('');
        } else {
            alert('Please enter a valid income amount.');
        }
    }

    const handleAddExpense = (e) => {
        e.preventDefault();
        const newExpense = parseFloat(amount);
        if (!isNaN(newExpense) && newExpense > 0 && description !== '') {
            setExpense(expense + newExpense);
            setTransactions([...transactions, { type: 'expense', amount: newExpense, description }]);
            setAmount('');
            setDescription('');
        } else {
            alert('Please enter a valid expense amount and description.');
        }
    }

    const addForm = (tabName) => {
        return (
            <form className='border my-2 p-2' onSubmit={tabName === 'income' ? handleAddIncome : handleAddExpense}>
                {tabName === 'income' && (
                    <div className='flex flex-col gap-y-2'>
                        <div>
                            <input type='number' placeholder='0.00' value={amount} onChange={handleAmountChange} className='border p-1' />
                        </div>
                        <div>
                            <button type='submit' className='bg-green-500 py-1 px-3 rounded text-white'>Add</button>
                        </div>
                    </div>
                )}
                {tabName === 'expense' && (
                    <div className='flex flex-col gap-y-2'>
                        <div>
                            <input type='number' placeholder='0.00' value={amount} onChange={handleAmountChange} className='border p-1' />
                        </div>
                        <div>
                            <input type='text' placeholder='Description' value={description} onChange={handleDescriptionChange} className='border p-1' />
                        </div>
                        <div>
                            <button type='submit' className='bg-green-500 py-1 px-3 rounded text-white'>Add</button>
                        </div>
                    </div>
                )}
            </form>
        )
    }

    const filterTransactions = (type) => {
        return transactions.filter(transaction => type === 'all' || transaction.type === type);
    }

    return (
        <div>
            <Header income={income} expense={expense} />
            <div className='w-full flex justify-center items-center p-4'>
                <button 
                    className='py-2 px-3 bg-green-300 text-gray-500 rounded hover:bg-green-500 hover:text-white' 
                    onClick={handleShowTransactionForm}
                >
                    New transaction
                </button>
            </div>
            <div className={`w-full flex flex-col justify-center items-center ${showTransactionForm ? 'block' : 'hidden'}`}>
                <div className='flex gap-x-2'>
                    {['income', 'expense'].map((tab) => (
                        <button 
                            key={tab} 
                            className={`py-1 px-3 text-white rounded ${activeAddTab === tab ? 'bg-gray-300' : 'bg-gray-500'}`} 
                            onClick={() => setActiveAddTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div>
                    {addForm(activeAddTab)}
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex gap-x-3 my-3'>
                    {['all', 'income', 'expense'].map((tab) => (
                        <button key={tab} onClick={() => setActiveFilterTab(tab)} className={`py-1 px-3 rounded text-white ${activeFilterTab === tab ? 'bg-gray-300' : 'bg-gray-500'}`}>{tab}</button>
                    ))}
                </div>
            </div>
            <div>
                <ul>
                    {filterTransactions(activeFilterTab).map((transaction, index) => (
                        <li key={index} className='border p-2 my-2'>
                            {transaction.type === 'income' ? (
                                <p>Income: ${transaction.amount}</p>
                            ) : (
                                <p>Expense: ${transaction.amount} - {transaction.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tracker;

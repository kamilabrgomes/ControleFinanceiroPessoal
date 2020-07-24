import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import TransactionsControl from './components/TransactionsControl';
import ModalTransaction from './components/ModalTransaction';
import ModalTransactionNew from './components/ModalTransactionNew';

import { PERIODS } from './helpers/Periods';
import M from 'materialize-css';
import Summary from './components/Summary';

export default function App() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [allTransactions, setAllTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(
    `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
  );
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalReceives, setTotalReceives] = useState(0);
  const [totalSpends, setTotalSpends] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);

  const getTransactions = async () => {
    const transactions = await api.getAllTransactions(currentPeriod);
    setTimeout(() => {
      setAllTransactions(transactions);
    }, 2000);
  };

  const getSummary = async () => {
    //pretty-ignore
    const countTransactions = allTransactions.length;
    setTotalTransactions(countTransactions);

    const SumReceives = allTransactions
      .filter((transaction) => {
        return transaction.type === '+';
      })
      .reduce((accumulator, currentItem) => {
        return accumulator + currentItem.value;
      }, 0);
    setTotalReceives(SumReceives);

    const SumSpends = allTransactions
      .filter((transaction) => {
        return transaction.type === '-';
      })
      .reduce((accumulator, currentItem) => {
        return accumulator + currentItem.value;
      }, 0);
    setTotalSpends(SumSpends);

    const CalcCurrentTotal = SumReceives - SumSpends;
    setCurrentTotal(CalcCurrentTotal);
  };

  useEffect(() => {
    getTransactions();
    getSummary();
  }, [allTransactions, currentPeriod]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    if (isDeleted) {
      getTransactions();
      getSummary();
    }
  };

  const handlePersist = (transactionToPersist) => {
    setSelectedTransaction(transactionToPersist);
    setIsModalOpen(true);
  };

  const handlePersistNew = (transactionToInsert) => {
    setSelectedTransaction(transactionToInsert);
    setIsModalNewOpen(true);
  };

  const handlePersistData = (formData) => {
    console.log(formData);
    const {
      _id,
      newDescription,
      newValue,
      newCategory,
      newYear,
      newMonth,
      newDay,
      newYearMonth,
      newYearMonthDay,
      newType,
    } = formData;

    const newTransactions = Object.assign([], allTransactions);
    const transactionToPersist = newTransactions.find(
      (transaction) => transaction._id === _id
    );
    transactionToPersist.description = newDescription;
    transactionToPersist.value = newValue;
    transactionToPersist.category = newCategory;
    transactionToPersist.year = newYear;
    transactionToPersist.month = newMonth;
    transactionToPersist.day = newDay;
    transactionToPersist.yearMonth = newYearMonth;
    transactionToPersist.yearMonthDay = newYearMonthDay;
    transactionToPersist.type = newType;
    setIsModalOpen(false);
  };

  const handlePersistNewData = async (formData) => {
    const isInserted = await api.insertTransaction(formData);
    if (isInserted) {
      getTransactions();
      getSummary();
    }
    setIsModalNewOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleCloseNew = () => {
    setIsModalNewOpen(false);
  };

  return (
    <div>
      <h5
        className="container center"
        style={{ marginBottom: '20px', fontWeight: 'bold' }}
      >
        Bootcamp Full Stack - Desafio Final
      </h5>
      <h5 className="container center" style={{ marginBottom: '20px' }}>
        Controle Financeiro Pessoal
      </h5>

      {allTransactions.length === 0 && <Spinner />}

      <div className="container center" style={{ width: '150px' }}>
        <select value={currentPeriod} onChange={handlePeriodChange}>
          {PERIODS.map((period) => {
            return (
              <option key={period} value={period}>
                {period}
              </option>
            );
          })}
        </select>
      </div>

      {allTransactions.length > 0 && (
        <Summary
          totalLanc={totalTransactions}
          totalReceitas={totalReceives}
          totalDespesas={totalSpends}
          saldo={currentTotal}
        />
      )}
      {allTransactions.length > 0 && (
        <TransactionsControl
          transactions={allTransactions}
          onDelete={handleDelete}
          onPersist={handlePersist}
          onPersistNew={handlePersistNew}
        />
      )}
      {isModalOpen && (
        <ModalTransaction
          style={customStyles.overlay}
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
      {isModalNewOpen && (
        <ModalTransactionNew
          style={customStyles.overlay}
          onSave={handlePersistNewData}
          onClose={handleCloseNew}
        />
      )}
    </div>
  );
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 1,
  },
};

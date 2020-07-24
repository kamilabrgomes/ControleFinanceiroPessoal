import React from 'react';
import Action from './Action';
import BuscaTransactions from './BuscaTransactions';
import NewTransactionButton from './NewTransactionButton';
import { useState } from 'react';
import { set } from 'mongoose';
import { useEffect } from 'react';
import { formatCurrency } from '../helpers/FormatHelpers';

export default function TransactionsControl({
  transactions,
  onDelete,
  onPersist,
  onPersistNew,
}) {
  const [filter, setFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(
    Object.assign([], transactions)
  );

  const tableDays = [];
  let currentDay = filteredTransactions[0].day;
  let currentTransactions = [];
  let id = 1;

  filteredTransactions.forEach((transaction) => {
    if (transaction.day !== currentDay) {
      tableDays.push({
        id: id++,
        day: currentDay,
        transactions: currentTransactions,
      });

      currentDay = transaction.day;
      currentTransactions = [];
    }
    currentTransactions.push(transaction);
  });
  tableDays.push({
    id: id++,
    day: currentDay,
    transactions: currentTransactions,
  });

  const handleActionClick = (id, type) => {
    const transaction = filteredTransactions.find(
      (transaction) => transaction._id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    onPersist(transaction);
  };
  const handleClickNew = () => {
    onPersistNew();
  };

  const handleChangeFilter = (newText) => {
    setFilter(newText);
    const filterToLowerCase = newText
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '');

    const filtered = transactions.filter((transaction) => {
      return transaction.descriptionFilter.includes(filterToLowerCase);
    });
    setFilteredTransactions(filtered);
  };
  return (
    <div>
      <div className="Container center" style={styles.flexRow}>
        <NewTransactionButton onActionClick={handleClickNew} />
        <BuscaTransactions
          filter={filter}
          onChangeFilter={handleChangeFilter}
        />
      </div>

      <div className="container center">
        {tableDays.map(({ id, transactions }) => {
          return (
            <table className="striped center" key={id}>
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>&nbsp;</th>
                  <th style={{ width: '20%' }}>&nbsp;</th>
                  <th style={{ width: '20%' }}>&nbsp;</th>
                  <th style={{ width: '20%' }}>&nbsp;</th>
                  <th style={{ width: '20%' }}>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(
                  ({ _id, description, value, category, day, type }) => {
                    const transactionStyle =
                      type === '+' ? styles.receita : styles.despesa;
                    return (
                      <tr style={transactionStyle} key={_id}>
                        <td>{day}</td>
                        <td>{description}</td>
                        <td style={{ fontWeight: 'bold' }}>{category}</td>
                        <td>{formatCurrency(value)}</td>
                        <td>
                          <Action
                            onActionClick={handleActionClick}
                            id={_id}
                            type="edit"
                          />
                          <Action
                            onActionClick={handleActionClick}
                            id={_id}
                            type="delete"
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
              <tfoot></tfoot>
            </table>
          );
        })}
      </div>
    </div>
  );
}
const styles = {
  receita: {
    background: 'mediumTurquoise',
    border: '5px solid white',
  },
  despesa: {
    background: 'lightCoral',
    border: '5px solid white',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex start',
    padding: '10px',
  },
};

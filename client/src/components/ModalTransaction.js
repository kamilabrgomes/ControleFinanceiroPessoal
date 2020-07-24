import React, { useState } from 'react';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { formatNumber } from '../helpers/FormatHelpers';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = selectedTransaction;

  // prettier-ignore
  const [transactionDescription, setTransactionDescription] = useState(description);
  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionYear, setTransactionYear] = useState(year);
  const [transactionMonth, setTransactionMonth] = useState(month);
  const [transactionDay, setTransactionDay] = useState(day);
  const [transactionYearMonth, setTransactionYearMonth] = useState(yearMonth);
  const [transactionYearMonthDay, setTransactionYearMonthDay] = useState(
    yearMonthDay
  );
  const [transactionType, setTransactionType] = useState(type);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    setTransactionYear(transactionYearMonthDay.substring(0, 4));
    setTransactionMonth(transactionYearMonthDay.substring(5, 7));
    setTransactionDay(transactionYearMonthDay.substring(8, 10));
    setTransactionYearMonth(transactionYearMonthDay.substring(0, 7));
  }, [transactionYearMonthDay]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      _id,
      newDescription: transactionDescription,
      newValue: transactionValue,
      newCategory: transactionCategory,
      newYear: transactionYear,
      newMonth: transactionMonth,
      newDay: transactionDay,
      newYearMonth: transactionYearMonth,
      newYearMonthDay: transactionYearMonthDay,
      newType: transactionType,
    };
    onSave(formData);
  };
  const handleClose = () => {
    onClose(null);
  };

  const handleDescriptionChange = (event) => {
    setTransactionDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setTransactionCategory(event.target.value);
  };

  const handleValueChange = (event) => {
    setTransactionValue(+event.target.value);
  };

  const handleYearMonthDayChange = (event) => {
    setTransactionYearMonthDay(event.target.value);
  };
  console.log(transactionType);
  return (
    <div>
      <Modal style={customStyles} isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Editar</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          {transactionType === '+' ? (
            <div style={{ padding: '10px' }}>
              <label>
                <input name="radio" type="radio" checked disabled="disabled" />
                <span style={styles.receita}>Receita</span>
              </label>
              <label>
                <input name="radio" type="radio" disabled="disabled" />
                <span style={styles.despesa}>Despesa</span>
              </label>
            </div>
          ) : (
            <div style={{ padding: '10px' }}>
              <label>
                <input name="radio" type="radio" disabled="disabled" />
                <span style={styles.receita}>Receita</span>
              </label>
              <label>
                <input name="radio" type="radio" checked disabled="disabled" />
                <span style={styles.despesa}>Despesa</span>{' '}
              </label>
            </div>
          )}

          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transactionDescription}
              onChange={handleDescriptionChange}
            />
            <label className="active" htmlFor="inputName">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={transactionCategory}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="inputName">
              Categoria:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              value={formatNumber(transactionValue)}
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputName">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputDate"
              type="date"
              value={transactionYearMonthDay}
              onChange={handleYearMonthDayChange}
            />
            <label className="active" htmlFor="inputName">
              Data:
            </label>
          </div>
          <div>
            <button className="waves-effect waves-lights btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  receita: {
    color: 'DarkCyan',
    fontWeight: 'bold',
  },
  despesa: {
    color: 'FireBrick',
    fontWeight: 'bold',
  },
};
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 1,
  },
};

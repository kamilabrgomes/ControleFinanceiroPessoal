import React from 'react';

export default function NewTransactionButton({ onActionClick }) {
  const handleClick = () => {
    onActionClick();
  };
  return (
    <button
      className="waves-effect waves-lights btn LightGreen"
      onClick={handleClick}
    >
      + NOVO LANÇAMENTO
    </button>
  );
}

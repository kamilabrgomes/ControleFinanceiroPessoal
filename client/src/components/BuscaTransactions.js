import React from 'react';

export default function BuscaTransactions({ filter, onChangeFilter }) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div>
      <input
        className="input-field"
        style={{ width: '700px' }}
        type="text"
        value={filter}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}

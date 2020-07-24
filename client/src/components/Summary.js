import React from 'react';
import { formatCurrency } from '../helpers/FormatHelpers';

export default function Summary({
  totalLanc,
  totalReceitas,
  totalDespesas,
  saldo,
}) {
  const saldoStyle = saldo >= 0 ? styles.positivo : styles.negativo;
  return (
    <div style={styles.flexRow}>
      <div>
        <span style={styles.title}>Lançamentos: </span>
        <span>{totalLanc}</span>
      </div>

      <div>
        <span style={styles.title}>Receitas: </span>
        <span style={styles.positivo}>{formatCurrency(totalReceitas)}</span>
      </div>

      <div>
        <span style={styles.title}>Despesas: </span>
        <span style={styles.negativo}>{formatCurrency(totalDespesas)}</span>
      </div>

      <div>
        <span style={styles.title}>Saldo: </span>
        <span style={saldoStyle}>{formatCurrency(saldo)}</span>
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    padding: '10px',
    border: '1px solid LightGrey',
    borderRadius: '2px',
  },
  title: {
    fontWeight: 'bold',
  },
  positivo: {
    color: 'DarkCyan',
    fontWeight: 'bold',
  },
  negativo: {
    color: 'FireBrick',
    fontWeight: 'bold',
  },
};

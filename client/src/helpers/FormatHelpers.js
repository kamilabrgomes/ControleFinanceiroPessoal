const formatter = Intl.NumberFormat('pt-BR');
const formatterCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}
function formatCurrency(value) {
  return formatterCurrency.format(value);
}

export { formatNumber, formatCurrency };

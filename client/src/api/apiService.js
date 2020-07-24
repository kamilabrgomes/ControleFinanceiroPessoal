import axios from 'axios';

const API_URL = 'https://kamila-desafio-final.herokuapp.com/api/transaction';

async function getAllTransactions(yearMonth) {
  const res = await axios.get(`${API_URL}/${yearMonth}`);
  const transactions = res.data.map((transaction) => {
    const { description, category } = transaction;

    return {
      ...transaction,
      descriptionFilter: description
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-zA-Zs]/g, ''),
      categoryLowerCase: category.toLowerCase(),
      isDeleted: false,
    };
  });
  transactions.sort((a, b) => a.description.localeCompare(b.description));
  transactions.sort((a, b) => a.yearMonthDay.localeCompare(b.yearMonthDay));

  return transactions;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data._id;
}
async function updateTransaction(transaction) {
  const response = await axios.put(API_URL, transaction);
  return response.data;
}
async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/${transaction._id}`);
  return response.data;
}

export {
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};

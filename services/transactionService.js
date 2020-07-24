const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  const transaction = new TransactionModel({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });

  try {
    const data = await transaction.save(transaction);
    if (!data) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const yearMonth = req.params.yearMonth;
  //condicao para o filtro no findAll
  var condition = yearMonth
    ? { yearMonth: { $regex: new RegExp(yearMonth), $options: 'i' } }
    : {};
  try {
    const data = await TransactionModel.find(condition);
    if (!data) {
      res.send({ message: `Ano/Mês ${yearMonth} não possui transações` });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findById({ _id: id });
    if (!data) {
      res.send({ message: `Transaction id ${id} não encontrado` });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Transaction id: ' + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      res.send({ message: `Transaction id ${id} não encontrado` });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a Transaction id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });
    if (!data) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Transaction id: ' + id });
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await TransactionModel.deleteMany();
    if (!data) {
      res.send({ message: `Não há Transaction para exclusão` });
    } else {
      res.send(data);
    }
    res.send({
      message: `Transaction excluidas`,
    });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transaction' });
  }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };

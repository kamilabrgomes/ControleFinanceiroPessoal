const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js');

transactionRouter.get('/', (_, response) => {
  response.send({
    message:
      'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
  });
});
transactionRouter.get('/:yearMonth', transactionService.findAll);
transactionRouter.get('/single/:id', transactionService.findOne);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);
transactionRouter.delete('/', transactionService.removeAll);

module.exports = transactionRouter;

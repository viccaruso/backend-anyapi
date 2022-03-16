const { Router } = require('express');
const Pokemon = require('../models/Pokemon');
// const Pokemon = require('../models/Pokemon');

module.exports = Router()
  .post('/', async (req, res) => {
    res.send(await Pokemon.insert(req.body));
  })

  .get('/', async (req, res) => {
    res.send(await Pokemon.getAll());
  })

  .get('/:id', async (req, res) => {
    res.send(await Pokemon.getById(req.params.id));
  })

  .patch('/:id', async (req, res) => {
    res.send(await Pokemon.updateById(req.params.id, req.body));
  })
  
  .delete('/:id', async (req, res) => {
    res.send(await Pokemon.deleteById(req.params.id));
  })

;

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
  
;

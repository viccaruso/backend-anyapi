const { Router } = require('express');
// const Pokemon = require('../models/Pokemon');

module.exports = Router()
  .get('/', async (req, res) => {
    res.send('You did it!');
  })
  
;

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const MilkShake = require('../schema/milkshake');

const milkShakeRouter = module.exports = exports = express.Router();

milkShakeRouter.get('/', (req, res, next) => {
  MilkShake.find({}, (err, milkshakes) => {
    console.log('not getting', milkshakes);
    if(err) return next(err);
    res.json(milkshakes);
  });
});

milkShakeRouter.post('/', jsonParser, (req, res, next) => {
  let newMilkshake = new MilkShake(req.body);
  newMilkshake.save((err, milkshake) => {
    if(err) return next(err);
    res.json(milkshake);
  });
});

milkShakeRouter.put('/', jsonParser, (req, res, next) => {
  let _id = req.body._id;
  MilkShake.findOneAndUpdate({_id: _id}, req.body, (err) => {
    if(err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

milkShakeRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  MilkShake.findOneAndRemove({_id}, (err) => {
    if(err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

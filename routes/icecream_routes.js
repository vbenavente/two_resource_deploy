'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const IceCream = require('../schema/icecream');

const iceCreamRouter = module.exports = exports = express.Router();

iceCreamRouter.get('/', (req, res, next) => {
  IceCream.find({}, (err, icecream) => {
    console.log('not getting', icecream);
    if(err) return next(err);
    res.json(icecream);
  });
});

iceCreamRouter.post('/', jsonParser, (req, res, next) => {
  let newIceCream = new IceCream(req.body);
  newIceCream.save((err, icecream) => {
    if(err) return next(err);
    res.json(icecream);
  });
});

iceCreamRouter.put('/', jsonParser, (req, res, next) => {
  let _id = req.body._id;
  IceCream.findOneAndUpdate({_id}, req.body, (err) => {
    if(err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

iceCreamRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  IceCream.findOneAndRemove({_id}, (err) => {
    if(err) return next(err);
    let message = 'successfully deleted';
    res.json({message});
  });
});

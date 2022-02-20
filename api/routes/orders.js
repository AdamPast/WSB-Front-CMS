const express = require('express')
const mongoose = require('mongoose')
//TODO: _id, productId, quantity
const router = express.Router();

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order.find()
    .populate("productId", "name")
    .then(result => {
        res.status(200).json({
            wiadomosc: 'Lista wszystkich zamówień',
            info: result
        })
    })
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        productId: req.body.productId,
        quantity: req.body.quantity
    })
    order
    .save()
    .then(result => {
        res.status(201).json({
            wiadomosc: 'Dodano nowe zamówienie',
            info: result
        });
    })
    .catch((err) => res.status(500).json({error: err}))
    
});

router.get("/:id", (req,res,next) => {
    const id = req.params.id;
    res.status(200).json({wiadomosc: `Szczegóły zamówienia o nr ${id}`})
})

router.delete("/:id", (req,res,next) => {
    const id = req.params.id;
    res.status(200).json({wiadomosc: `Usunięto zamówienia o nr ${id}`})
})


module.exports = router;
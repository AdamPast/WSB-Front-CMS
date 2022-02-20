const express = require('express')
const mongoose = require('mongoose')

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
    .catch((err) => res.status(500).json({error: err}))
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
    Order.findById(id)
    .then(result => {
        res.status(200).json({
            wiadomosc: `Szczegóły zamówienia o nr ${id}`,
            info: result
        })
    })
    .catch((err) => res.status(500).json({error: err}))
    
})

router.delete("/:id", (req,res,next) => {
    const id = req.params.id;
    Order.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).json({wiadomosc: `Usunięto produkt o nr ${id}`})

    })
    .catch((err) => res.status(500).json({error: err}))
})


module.exports = router;
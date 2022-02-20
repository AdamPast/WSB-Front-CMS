const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .then(result => {
        res.status(200).json({
            wiadomosc: 'Lista wszystkich produktów',
            info: result
        })
    })
    .catch(err => console.log(err))
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result => {
        res.status(201).json({
            wiadomosc: 'Dodano nowy produkt',
            info: result
        });
    })
        .catch(err => console.log(err))
});

router.get("/:id", (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .then(result => {
        res.status(200).json({
            wiadomosc: `Szczegóły produktu o nr ${id}`,
            info: result
        })
    })
    .catch(err => console.log(err))
    
})

router.put("/:id", (req,res,next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            price: req.body.price
        },
        {
            new:true
        }
        )
        
    .then((result) => {
        res.status(200).json({
            wiadomosc: `Zmiana produktu o nr ${id}`,
            info: result
        });

    })
    .catch(err => console.log(err))
})

router.delete("/:id", (req,res,next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).json({wiadomosc: `Usunięto produkt o nr ${id}`})

    })
    .catch(err => console.log(err))
})


module.exports = router;

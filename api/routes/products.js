const express = require('express')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({wiadomosc: 'Lista wszystkich produktów'})
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        wiadomosc: 'Dodano nowy produkt',
        info: product
    });
});

router.get("/:id", (req,res,next) => {
    const id = req.params.id;
    res.status(200).json({wiadomosc: `Szczegóły produktu o nr ${id}`})
})

router.put("/:id", (req,res,next) => {
    const id = req.params.id;
    res.status(200).json({wiadomosc: `Zmiana produktu o nr ${id}`})
})

router.delete("/:id", (req,res,next) => {
    const id = req.params.id;
    res.status(200).json({wiadomosc: `Usunięto produkt o nr ${id}`})
})


module.exports = router;

const express = require('express')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({wiadomosc: 'Lista wszystkich zamówień'})
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        wiadomosc: 'Dodano nowe zamówienie',
        info: product
    });
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
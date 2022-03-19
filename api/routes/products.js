const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

const Product = require('../models/product')

const auth = require('../middleware/auth')

//ładowanie obrazkow
const multer = require('multer')
//zmiana miejsca przechowywania i nazwy pliku
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replaceAll(":", "_") + file.originalname)
    }
  })
//filtracja
 const fileFilter = (req, file, cb) => {
     if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
         cb(null,true)
     }else{
         cb(null,false)
     }
 }
const upload = multer({dest: 'uploads/', storage: storage, limits: {
    fileSize: 1024*1024*5,
},
    fileFilter: fileFilter,
})

router.get('/', (req, res, next) => {
    Product.find()
    .then(result => {
        res.status(200).json({
            wiadomosc: 'Lista wszystkich produktów',
            info: result
        })
    })
    .catch((err) => res.status(500).json({error: err}))
});

router.post('/', upload.single('productImage'), auth, (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    product
    .save()
    .then(result => {
        res.status(201).json({
            wiadomosc: 'Dodano nowy produkt',
            info: result
        });
    })
    .catch((err) => res.status(500).json({error: err}))
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
    .catch((err) => res.status(500).json({error: err}))
    
})

router.put("/:id", auth,(req,res,next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, {name: req.body.name, price: req.body.price},{new: true})
    .then((result) => {
        res.status(200).json({
            wiadomosc: `Zmiana produktu o nr ${id}`,
            info: result
        });

    })
    .catch((err) => res.status(500).json({error: err}))
})

router.delete("/:id", auth, (req,res,next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).json({wiadomosc: `Usunięto produkt o nr ${id}`})

    })
    .catch((err) => res.status(500).json({error: err}))
})


module.exports = router;

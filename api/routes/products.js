const express = require('express')
const router = express.Router();

const Product = require('../models/product')
//import kontrolerów
const ProductsController = require('../controllers/products')
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

router.get('/', ProductsController.products_get_all);

router.post('/', upload.single('productImage'), auth, ProductsController.products_add_new);

router.get("/:id", ProductsController.products_get_by_id)

router.put("/:id", auth, ProductsController.products_change)

router.delete("/:id", auth, ProductsController.products_remove)


module.exports = router;

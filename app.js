const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



//instancja expressa
const app = express();


require('dotenv').config()
//statyczny katalog ze zdjęciami
app.use('/uploads', express.static('uploads'));

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.PASS}@${process.env.CLUSTER}.e7vee.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
app.use(bodyParser.json())

app.use(cors());

//logger
app.use(morgan('combined'))

//implementacja routingu
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users')

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes)


app.use((req,res,next) => {
    res.status(404).json({wiadomosc: 'Brak danych'})
})


module.exports = app;
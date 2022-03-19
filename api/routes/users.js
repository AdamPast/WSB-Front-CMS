const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();

const User = require('../models/user')

//zakladanie konta

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((user) => {
          res.status(201).json({ wiadomosc: 'Utworzono nowego użytkownika' });
        })
        .catch((err) => res.status(500).json({ wiadomosc: err }));
    });  
  });

// logowanie

router.post('/login', (req, res, next) => {
    // wyciagam z bazy usera o znany emailu
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(401).json({ wiadomosc: 'Brak autoryzacji' });
      } else {
        // walidacja hasła
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (!result) {
            return res.status(401).json({ wiadomosc: 'Brak autoryzacji' });
          } else {
              //tworze tokena
            const token = jwt.sign({email: user.email, id: user._id}, 
                process.env.JWT_KEY, 
                {expiresIn: "1h"})
            return res.status(200).json({ 
                wiadomosc: 'Zalogowano',
                token: token
             });
          }
        });
      }
    });
  });

module.exports = router;

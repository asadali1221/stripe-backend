const express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Set your stripe private key here
const stripe = require('stripe')('sk_test_51HnOIGHFh0EYi2CVhNrGyoSxkcAR2Ic5oxKBrWXvU6jgmBHU4kfIBYjq07pD3WbOaU7p5WleVOxtQ4ygKlc8hBb700nNzRsOEp');
const app = express();

app.post('/charge',urlencodedParser, (req, res) => {
    var stripeToken = req.body.token;

     stripe.charges.create({
        amount: req.body.amount * 100,
        currency: 'usd',
        source: req.body.token,
        capture: false,
        description: 'My First Test Charge (created for API docs)',
    }).then(response => {
        res.send(response)
        // do something in success here
     }).catch(error => {
         res.send(error);
        // do something in error here
     });
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({ message: err.message });
      });
      
      app.listen(3000);

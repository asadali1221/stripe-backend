const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set your stripe private key here
const stripe = require('stripe')('sk_test_51HnOIGHFh0EYi2CVhNrGyoSxkcAR2Ic5oxKBrWXvU6jgmBHU4kfIBYjq07pD3WbOaU7p5WleVOxtQ4ygKlc8hBb700nNzRsOEp');
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.post('/charge', (req, res) => {
    console.log(req.body);
 
     stripe.charges.create({
        amount: Number(req.body.amount),
        currency: 'ngn',
        source: req.body.token,
        // capture: false,
    }).then(response => {
        res.send(response);
        // do something in success here
     }).catch(error => {
         res.send(error);
        // do something in error here
     });
});

app.post('/updateCustomer', (req, res) => {
   console.log(req.body);

   stripe.customers.update(
      req.body.id,
       {invoice_settings
         : {default_payment_method: 'card_1JCRU2HFh0EYi2CV7nYpccmX'}}
       // capture: false,
   ).then(response => {
       res.send(response);
       // do something in success here
    }).catch(error => {
        res.send(error);
       // do something in error here
    });
});



app.get('/getCustomer', (req, res) => {
  console.log(req.body);

   stripe.customers.retrieve(req.query.id).then(response => {
      res.send(response);
      // do something in success here
   }).catch(error => {
       res.send(error);
      // do something in error here
   });
});



app.get('/getPaymentMethods', (req, res) => {
   console.log(req.body);
 
    stripe.paymentMethods.list(
       {
          customer:req.query.id,
          type: 'card'
          }).then(response => {
       res.send(response);
       // do something in success here
    }).catch(error => {
        res.send(error);
       // do something in error here
    });
 });


app.get('/getCustomerSubscription', (req, res) => {
  console.log(req.query);

   stripe.subscriptions.list( {customer:req.query.id}).then(response => {
      res.send(response);
      // do something in success here
   }).catch(error => {
       res.send(error);
      // do something in error here
   });
});

app.get('/listInvoices', (req, res) => {
   console.log(req.query);
 
   stripe.invoices.list({customer:req.query.id}).then(response => {
       res.send(response);
       // do something in success here
    }).catch(error => {
        res.send(error);
       // do something in error here
    });
 });

app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({ message: err.message });
      });
      
app.listen(port);

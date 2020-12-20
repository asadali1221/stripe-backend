const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const { Client, Environment } = require('square');


const client = new Client({
  environment: Environment.Sandbox,
  accessToken: 'EAAAELE2EK68fqrnhrHKWC7Zjpgu29trHtI4B41_GOHx_aO7gqlImIIq43dTj-Np',
})
const paymentsApi = client.paymentsApi;

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));




app.post('/smokePaymentRequest', (req,res) => {
  console.log(req.body);
  const body = {
    sourceId: 'cnon:card-nonce-ok',
    idempotencyKey: 'b141de17-b056-4b5b-8531-46541ea08a00',
    amountMoney: {
      amount: 20,
      currency: 'USD'
    }
  };

paymentsApi.createPayment(body).then(response => {
  console.log(res)
  res.send(response.result);
  db.collection('users')
  .doc(req.body.number)
  .collection('payments')
  .doc(response.result.payment.id)
  .set(response.result);
}).catch(error=> {
  console.log(error);
})
})


app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({ message: err.message });
      });
      
app.listen(port);

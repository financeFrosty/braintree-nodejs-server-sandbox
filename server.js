// create .env file
// sandbox.braintreegateway.com
// merchantId=""
// publicKey=""
// privateKey=""

const braintree = require("braintree");

const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
const { send } = require("express/lib/response");

require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.merchantId,
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/token', (req, res) => {
    console.log('sending token');
    gateway.clientToken.generate({}, (err, response) => {
        if(err) console.log(err);
        res.send({ token: response.clientToken });
    });
})

app.post("/nonce", (req, res) => {
    const nonce = req.body.payment_method_nonce;
    console.log('receiving form with nonce',nonce);

    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonce,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})




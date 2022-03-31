

const braintree = require("braintree");

const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
const { send } = require("express/lib/response");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Get those values from your account
    merchantId: "",
    publicKey: "",
    privateKey: ""
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/token', (req, res) => {
    console.log('sending token');
    gateway.clientToken.generate({}, (err, response) => {
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
            send(err);
        }
        console.log(result);
        res.send("Success");
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})




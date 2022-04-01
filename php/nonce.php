<?php

require 'vendor/autoload.php';

$gateway = new Braintree\Gateway([
    'environment' => 'sandbox',
    'merchantId' => '42zxxx27mz43797m',
    'publicKey' => 'krqw6mt7rqhc5wsq',
    'privateKey' => 'fc25cc44bc739d8c9a0476e7db323b67'
]);

$nonceFromTheClient = $_POST["payment_method_nonce"];

$result = $gateway->transaction()->sale([
    'amount' => '10.00',
    'paymentMethodNonce' => $nonceFromTheClient,
    'options' => [
      'submitForSettlement' => True
    ]
  ]);

echo var_dump( json_encode($result) );
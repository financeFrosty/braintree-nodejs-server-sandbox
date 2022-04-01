<?php 

    require 'vendor/autoload.php';

    $gateway = new Braintree\Gateway([
        'environment' => 'sandbox',
        'merchantId' => '42zxxx27mz43797m',
        'publicKey' => 'krqw6mt7rqhc5wsq',
        'privateKey' => 'fc25cc44bc739d8c9a0476e7db323b67'
    ]);
    
?>

<head>
    <meta charset="utf-8">
    <script src="https://js.braintreegateway.com/web/dropin/1.33.0/js/dropin.min.js"></script>
</head>

<body>
<form 	id="payment-form" 
        action="http://localhost/~manjaro/nonce.php" 
        method="post" >
        <div id="dropin-container"></div>
        <input type="submit" value="submit">
        <input type="hidden" id="nonce" name="payment_method_nonce">
</form>
	<script>
		const form = document.getElementById("payment-form");
		console.log('requesting a token...');
		fetch('http://localhost/~manjaro/token.php')
			.then(response => { return(response.json()); })
			.then(data => {
				let token = data;
				console.log("token: ", token);
				braintree.dropin.create({
					container: document.getElementById('dropin-container'),
                    authorization: token
				}, (error, dropinInstance) => {
					form.addEventListener('submit', event => { 
                        event.preventDefault();
                        dropinInstance.requestPaymentMethod((error, payload) => {
                            if(error) console.error(error);
                            document.getElementById("nonce").value = payload.nonce;
                            console.log("submitting form with nonce");
                            form.submit();
                        })
                    })
				})
			});
		
	</script>

	
</body>
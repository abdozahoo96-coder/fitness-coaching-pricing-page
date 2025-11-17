import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// myPOS Test Credentials (from official documentation)
const MYPOS_CONFIG = {
  SID: '000000000000010',
  WALLET_NUMBER: '61938166610',
  KEY_INDEX: 1,
  TEST_URL: 'https://www.mypos.com/vmp/checkout-test',
  PROD_URL: 'https://www.mypos.com/vmp/checkout',
  PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCf0TdcTuphb7X+Zwekt1XKEWZDczSGecfo6vQfqvraf5VPzcnJ
2Mc5J72HBm0u98EJHan+nle2WOZMVGItTa/2k1FRWwbt7iQ5dzDh5PEeZASg2UWe
hoR8L8MpNBqH6h7ZITwVTfRS4LsBvlEfT7Pzhm5YJKfM+CdzDM+L9WVEGwIDAQAB
AoGAYfKxwUtEbq8ulVrD3nnWhF+hk1k6KejdUq0dLYN29w8WjbCMKb9IaokmqWiQ
5iZGErYxh7G4BDP8AW/+M9HXM4oqm5SEkaxhbTlgks+E1s9dTpdFQvL76TvodqSy
l2E2BghVgLLgkdhRn9buaFzYta95JKfgyKGonNxsQA39PwECQQDKbG0Kp6KEkNgB
srCq3Cx2od5OfiPDG8g3RYZKx/O9dMy5CM160DwusVJpuywbpRhcWr3gkz0QgRMd
IRVwyxNbAkEAyh3sipmcgN7SD8xBG/MtBYPqWP1vxhSVYPfJzuPU3gS5MRJzQHBz
sVCLhTBY7hHSoqiqlqWYasi81JzBEwEuQQJBAKw9qGcZjyMH8JU5TDSGllr3jybx
FFMPj8TgJs346AB8ozqLL/ThvWPpxHttJbH8QAdNuyWdg6dIfVAa95h7Y+MCQEZg
jRDl1Bz7eWGO2c0Fq9OTz3IVLWpnmGwfW+HyaxizxFhV+FOj1GUVir9hylV7V0DU
QjIajyv/oeDWhFQ9wQECQCydhJ6NaNQOCZh+6QTrH3TC5MeBA1Yeipoe7+BhsLNr
cFG8s9sTxRnltcZl1dXaBSemvpNvBizn0Kzi8G3ZAgc=
-----END RSA PRIVATE KEY-----`,
  PUBLIC_CERT: `-----BEGIN CERTIFICATE-----
MIIBsTCCARoCCQCCPjNttGNQWDANBgkqhkiG9w0BAQsFADAdMQswCQYDVQQGEwJC
RzEOMAwGA1UECgwFbXlQT1MwHhcNMTgxMDEyMDcwOTEzWhcNMjgxMDA5MDcwOTEz
WjAdMQswCQYDVQQGEwJCRzEOMAwGA1UECgwFbXlQT1MwgZ8wDQYJKoZIhvcNAQEB
BQADgY0AMIGJAoGBAML+VTmiY4yChoOTMZTXAIG/mk+xf/9mjwHxWzxtBJbNncNK
0OLI0VXYKW2GgVklGHHQjvew1hTFkEGjnCJ7f5CDnbgxevtyASDGst92a6xcAedE
adP0nFXhUz+cYYIgIcgfDcX3ZWeNEF5kscqy52kpD2O7nFNCV+85vS4duJBNAgMB
AAEwDQYJKoZIhvcNAQELBQADgYEACj0xb+tNYERJkL+p+zDcBsBK4RvknPlpk+YP
ephunG2dBGOmg/WKgoD1PLWD2bEfGgJxYBIg9r1wLYpDC1txhxV+2OBQS86KULh0
NEcr0qEY05mI4FlE+D/BpT/+WFyKkZug92rK0Flz71Xy/9mBXbQfm+YK6l9roRYd
J4sHeQc=
-----END CERTIFICATE-----`
};

/**
 * Create signature for myPOS IPC request
 */
function createSignature(data) {
  console.log('🔐 Creating signature for data...');
  
  // Concatenate all values with '-' separator
  const concData = Buffer.from(Object.values(data).join('-')).toString('base64');
  
  console.log('📝 Data to sign:', concData);
  
  // Sign with private key using SHA256
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(concData);
  sign.end();
  
  const signature = sign.sign(MYPOS_CONFIG.PRIVATE_KEY, 'base64');
  
  console.log('✅ Signature created successfully');
  
  return signature;
}

/**
 * Create payment form endpoint
 */
app.post('/api/create-payment-form', async (req, res) => {
  try {
    const { orderId, amount, currency, planTitle, customerEmail } = req.body;

    console.log('💳 Creating payment form for order:', orderId);
    console.log('Amount:', amount, currency);
    console.log('Plan:', planTitle);

    // Prepare IPC parameters
    const ipcData = {
      IPCmethod: 'IPCPurchase',
      IPCVersion: '1.4',
      IPCLanguage: 'en',
      SID: MYPOS_CONFIG.SID,
      WalletNumber: MYPOS_CONFIG.WALLET_NUMBER,
      KeyIndex: MYPOS_CONFIG.KEY_INDEX,
      Amount: parseFloat(amount).toFixed(2),
      Currency: currency || 'USD',
      OrderID: orderId,
      URL_OK: `${req.body.successUrl || 'https://fitness-coaching-pricing-page.vercel.app'}/payment-success`,
      URL_Cancel: `${req.body.cancelUrl || 'https://fitness-coaching-pricing-page.vercel.app'}/payment-cancel`,
      URL_Notify: `${req.body.notifyUrl || 'https://your-server.com'}/api/payment-webhook`,
      CustomerEmail: customerEmail || 'customer@example.com',
      CustomerFirstNames: 'Fitness',
      CustomerFamilyName: 'Customer',
      CustomerCountry: 'USA',
      CustomerCity: 'New York',
      CustomerZIPCode: '10001',
      CustomerAddress: '123 Fitness Street',
      Note: `${planTitle} - Fitness Coaching`,
      CardTokenRequest: 0,
      PaymentParametersRequired: 3,
      CartItems: 1,
      Article_1: planTitle,
      Quantity_1: 1,
      Price_1: parseFloat(amount).toFixed(2),
      Amount_1: parseFloat(amount).toFixed(2),
      Currency_1: currency || 'USD'
    };

    // Create signature
    const signature = createSignature(ipcData);
    ipcData.Signature = signature;

    console.log('✅ Payment form data created');

    res.json({
      success: true,
      formUrl: MYPOS_CONFIG.TEST_URL, // Use TEST_URL for testing
      formData: ipcData
    });

  } catch (error) {
    console.error('❌ Error creating payment form:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Payment webhook endpoint
 */
app.post('/api/payment-webhook', (req, res) => {
  console.log('📨 Payment webhook received');
  console.log('Data:', req.body);
  
  // TODO: Verify signature and process payment
  // For now, just acknowledge receipt
  res.status(200).send('OK');
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'myPOS IPC server running',
    mode: 'TEST'
  });
});

app.listen(PORT, () => {
  console.log('🚀 myPOS IPC Server Started');
  console.log('━'.repeat(50));
  console.log(`📍 Server running on port: ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Payment API: http://localhost:${PORT}/api/create-payment-form`);
  console.log(`🧪 Mode: TEST (using myPOS test credentials)`);
  console.log(`🌐 Test URL: ${MYPOS_CONFIG.TEST_URL}`);
  console.log('━'.repeat(50));
});

export default app;

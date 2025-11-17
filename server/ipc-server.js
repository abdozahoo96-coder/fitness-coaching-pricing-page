import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// myPOS IPC Configuration
const MYPOS_CONFIG = {
  sid: process.env.MYPOS_SID,
  walletNumber: process.env.MYPOS_WALLET_NUMBER,
  keyIndex: process.env.MYPOS_KEY_INDEX || '1',
  privateKey: process.env.MYPOS_PRIVATE_KEY,
  publicCert: process.env.MYPOS_PUBLIC_CERT,
  ipcUrl: process.env.MYPOS_ENVIRONMENT === 'production' 
    ? 'https://mypos.com/vmp/checkout'
    : 'https://mypos.com/vmp/checkout-test',
  successUrl: process.env.SUCCESS_URL || 'http://localhost:3015/payment-success',
  cancelUrl: process.env.CANCEL_URL || 'http://localhost:3015/payment-cancel',
  notifyUrl: process.env.NOTIFY_URL || 'http://localhost:4001/webhook',
};

console.log('🔧 myPOS Configuration:');
console.log('   SID:', MYPOS_CONFIG.sid);
console.log('   Wallet:', MYPOS_CONFIG.walletNumber);
console.log('   Environment:', process.env.MYPOS_ENVIRONMENT || 'test');
console.log('   IPC URL:', MYPOS_CONFIG.ipcUrl);

/**
 * Create signature for myPOS IPC request
 */
function createSignature(data) {
  try {
    // Concatenate all values with '-' separator
    const concatenated = Object.values(data).join('-');
    
    // Base64 encode the concatenated string
    const encoded = Buffer.from(concatenated, 'utf-8').toString('base64');
    
    // Sign with private key using SHA256
    const sign = crypto.createSign('SHA256');
    sign.update(encoded);
    sign.end();
    
    const signature = sign.sign(MYPOS_CONFIG.privateKey, 'base64');
    
    console.log('✅ Signature created successfully');
    return signature;
  } catch (error) {
    console.error('❌ Error creating signature:', error.message);
    throw error;
  }
}

/**
 * Generate payment form data
 */
app.post('/api/create-payment', async (req, res) => {
  try {
    const { orderId, amount, currency, planTitle, customerEmail } = req.body;
    
    console.log('📝 Payment request received:');
    console.log('   Order ID:', orderId);
    console.log('   Amount:', amount);
    console.log('   Currency:', currency);
    console.log('   Plan:', planTitle);
    
    // Create IPC parameters
    const ipcData = {
      IPCmethod: 'IPCPurchase',
      IPCVersion: '1.4',
      IPCLanguage: 'en',
      SID: MYPOS_CONFIG.sid,
      WalletNumber: MYPOS_CONFIG.walletNumber,
      KeyIndex: MYPOS_CONFIG.keyIndex,
      Amount: parseFloat(amount).toFixed(2),
      Currency: currency || 'USD',
      OrderID: orderId,
      URL_OK: MYPOS_CONFIG.successUrl,
      URL_Cancel: MYPOS_CONFIG.cancelUrl,
      URL_Notify: MYPOS_CONFIG.notifyUrl,
      CustomerEmail: customerEmail || 'customer@example.com',
      CustomerFirstNames: 'Fitness',
      CustomerFamilyName: 'Customer',
      CustomerCountry: 'USA',
      CustomerCity: 'New York',
      CustomerZIPCode: '10001',
      CustomerAddress: '123 Main St',
      Note: `${planTitle} - Fitness Coaching`,
      CardTokenRequest: '0',
      PaymentParametersRequired: '3',
    };
    
    // Create signature
    const signature = createSignature(ipcData);
    ipcData.Signature = signature;
    
    console.log('✅ Payment form data created');
    
    // Return form data and IPC URL
    res.json({
      success: true,
      ipcUrl: MYPOS_CONFIG.ipcUrl,
      formData: ipcData,
    });
    
  } catch (error) {
    console.error('❌ Error creating payment:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Webhook endpoint to receive payment notifications from myPOS
 */
app.post('/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook received from myPOS');
    console.log('   Data:', req.body);
    
    // Here you would verify the signature and process the payment
    // For now, just acknowledge receipt
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).send('ERROR');
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'myPOS IPC Server is running',
    environment: process.env.MYPOS_ENVIRONMENT || 'test',
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ myPOS IPC Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`🔗 API: http://localhost:${PORT}/api/create-payment`);
  console.log(`📨 Webhook: http://localhost:${PORT}/webhook\n`);
});

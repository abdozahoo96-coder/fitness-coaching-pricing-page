import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from server/.env
config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// myPOS Configuration
const MYPOS_CLIENT_ID = process.env.MYPOS_CLIENT_ID;
const MYPOS_CLIENT_SECRET = process.env.MYPOS_CLIENT_SECRET;
const MYPOS_AUTH_URL = process.env.MYPOS_AUTH_URL || 'https://sandbox-auth-api.mypos.com';
const MYPOS_API_URL = process.env.MYPOS_API_URL || 'https://sandbox-api.mypos.com';

// Get OAuth token from myPOS
async function getMyPOSToken() {
  try {
    console.log('🔐 Requesting OAuth token from myPOS...');
    console.log('📍 Auth URL:', `${MYPOS_AUTH_URL}/oauth/token`);
    
    // Create Basic Auth header (base64 encode client_id:client_secret)
    const credentials = Buffer.from(`${MYPOS_CLIENT_ID}:${MYPOS_CLIENT_SECRET}`).toString('base64');
    
    const response = await fetch(`${MYPOS_AUTH_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const responseText = await response.text();
    console.log('📥 OAuth Response Status:', response.status);
    console.log('📥 OAuth Response:', responseText);

    if (!response.ok) {
      throw new Error(`OAuth failed (${response.status}): ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('✅ OAuth token obtained successfully');
    return data.access_token;
  } catch (error) {
    console.error('❌ OAuth Error:', error.message);
    throw error;
  }
}

// Create payment endpoint
app.post('/api/create-payment', async (req, res) => {
  try {
    const { orderId, amount, currency, description, planId, planTitle } = req.body;

    console.log('📝 Payment request received:', { orderId, amount, currency, description });

    // Get access token
    console.log('🔑 Attempting to get OAuth token...');
    const token = await getMyPOSToken();
    console.log('✅ Token received');

    // Create payment session with myPOS
    console.log('💳 Creating payment session with myPOS...');
    const paymentEndpoint = 'https://www.mypos.com/vmp/payment-request';
    console.log('📍 Payment API URL:', paymentEndpoint);
    
    const paymentData = {
      qr_generated: false,
      amount: parseFloat(amount),
      currency: currency,
      client_name: 'Fitness Coaching Customer',
      reason: description,
      booking_text: `${planTitle} Plan`,
      payment_request_lang: 'en',
      notify_url: `${process.env.BACKEND_URL}/api/payment-webhook`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      ok_url: `${process.env.FRONTEND_URL}/payment-success`,
    };
    
    console.log('📦 Payment data:', JSON.stringify(paymentData, null, 2));
    
    // Generate a unique request ID
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const response = await fetch(paymentEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'API-Key': MYPOS_CLIENT_ID, // Use Client ID as API Key
        'X-Request-ID': requestId,
      },
      body: JSON.stringify(paymentData),
    });

    const responseText = await response.text();
    console.log('📥 myPOS Response Status:', response.status);
    console.log('📥 myPOS Response:', responseText);
    console.log('📥 Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`myPOS API error (${response.status}): ${responseText}`);
    }

    // Check if response is empty
    if (!responseText || responseText.trim() === '') {
      console.log('⚠️ Empty response from myPOS API');
      throw new Error('myPOS API returned empty response. The API endpoint or data format may be incorrect.');
    }

    const data = JSON.parse(responseText);
    console.log('✅ Payment session created successfully');
    console.log('📤 Returning data:', data);
    
    // The response should contain a payment URL or link
    // Common fields: payment_url, checkout_url, link, url
    res.json({
      ...data,
      // Ensure we have a consistent field name for the frontend
      checkout_url: data.payment_url || data.checkout_url || data.link || data.url,
    });
  } catch (error) {
    console.error('❌ Error creating payment:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Check server logs for more information'
    });
  }
});

// Webhook endpoint to receive payment notifications from myPOS
app.post('/api/payment-webhook', async (req, res) => {
  try {
    console.log('Payment webhook received:', req.body);
    
    // Process the payment notification
    // You can save to database, send emails, etc.
    
    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'myPOS payment server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ myPOS payment server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/create-payment`);
  console.log(`\n🚀 Frontend should be running on http://localhost:3012/\n`);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});

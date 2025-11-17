# Fitness Coaching Pricing Page - myPOS IPC Direct Integration

Live payment integration for fitness coaching subscription and lifetime plans using myPOS IPC (Internet Payment Client).

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Servers

Run both frontend and backend simultaneously:

```bash
npm run dev:all
```

Or run separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

### 3. Open in Browser

- Frontend: http://localhost:3015
- Backend API: http://localhost:4001

## 🧪 Testing with myPOS Test Environment

The app is currently configured with myPOS **test credentials** for safe testing.

### Test Payment Flow:

1. Open http://localhost:3015
2. Click "Choose Plan" on any pricing option
3. You'll be redirected to myPOS **test checkout**
4. Use test card details (see myPOS documentation)
5. Complete payment
6. Redirected back to success/cancel page

### Test Cards:

See myPOS test card documentation: https://developers.mypos.com/en/doc/online_payments/v1_4/173-testing

## 📦 What's Included

### Products:

**Lifetime Plans:**
- 1 Member - $289
- 2 Members - $416
- 3 Members - $543
- 4 Members - $670
- 5 Members - $797

**Subscription Plans:**
- 1 Month - $10.99
- 3 Months - $25.99
- 6 Months - $39.99
- 12 Months - $59.99 (Most Popular)
- 24 Months - $99.99 (Best Deal)

## 🔧 Configuration

### For Production:

1. **Get your real myPOS IPC credentials:**
   - Log into https://mypos.com/
   - Go to Settings → Developers → IPC Settings
   - Get: SID, Wallet Number, Private Key, Public Certificate

2. **Update `server/.env`:**
   ```env
   MYPOS_SID=your_real_sid
   MYPOS_WALLET_NUMBER=your_real_wallet
   MYPOS_KEY_INDEX=1
   MYPOS_ENVIRONMENT=production
   MYPOS_PRIVATE_KEY="your_real_private_key"
   MYPOS_PUBLIC_CERT="your_real_public_cert"
   ```

3. **Update URLs for your domain:**
   ```env
   SUCCESS_URL=https://yoursite.com/payment-success
   CANCEL_URL=https://yoursite.com/payment-cancel
   NOTIFY_URL=https://api.yoursite.com/webhook
   ```

4. **Update frontend `.env`:**
   ```env
   VITE_BACKEND_URL=https://api.yoursite.com
   ```

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │  (Port 3015)
│   - Pricing cards   │
│   - Payment UI      │
└──────────┬──────────┘
           │
           │ HTTP POST
           ↓
┌─────────────────────┐
│  Node.js Backend    │  (Port 4001)
│  - Sign payments    │
│  - Generate forms   │
└──────────┬──────────┘
           │
           │ Form POST
           ↓
┌─────────────────────┐
│  myPOS Checkout     │
│  - Test/Production  │
│  - Payment gateway  │
└─────────────────────┘
```

## 📂 Project Structure

```
fitness-coaching-pricing-page/
├── server/
│   ├── ipc-server.js      # IPC backend server
│   └── .env               # Server configuration
├── services/
│   └── mypos.ts           # myPOS IPC integration
├── components/
│   ├── PricingCard.tsx    # Pricing display
│   ├── PaymentPage.tsx    # Payment interface
│   ├── PaymentSuccess.tsx # Success page
│   └── PaymentCancel.tsx  # Cancel page
├── constants.tsx          # Product definitions
└── App.tsx               # Main app with routing
```

## 🔐 Security Notes

- ✅ Private keys are stored server-side only
- ✅ Signatures are generated on backend
- ✅ No sensitive data in frontend code
- ✅ HTTPS required for production
- ✅ `.env` files excluded from git

## 🚀 Deployment

### Backend (Node.js):
- Deploy to: Heroku, Railway, Render, DigitalOcean, AWS, etc.
- Environment: Node.js 18+
- Start command: `node server/ipc-server.js`
- Set environment variables in hosting dashboard

### Frontend (React):
- Deploy to: Vercel, Netlify, Cloudflare Pages, etc.
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_BACKEND_URL` environment variable

## 📚 Documentation

- [myPOS IPC Documentation](https://developers.mypos.com/en/doc/online_payments/v1_4/21-api-call--ipcpurchase)
- [myPOS Testing Guide](https://developers.mypos.com/en/doc/online_payments/v1_4/173-testing)
- [myPOS Sandbox](https://developers.mypos.com/en/sandbox)

## 🐛 Troubleshooting

### Payment not redirecting:
- Check backend server is running: `http://localhost:4001/health`
- Verify credentials in `server/.env`
- Check browser console for errors

### Signature errors:
- Verify private key format (should have BEGIN/END markers)
- Check all IPC parameters are correct
- Ensure no extra spaces in credentials

### Backend errors:
- Check Node.js version (18+)
- Verify dotenv is loading `.env` file
- Check console output for specific errors

## 📝 License

MIT

## 🤝 Support

For myPOS integration issues, contact:
- myPOS Developers: https://developers.mypos.com/en/contacts
- myPOS Support: support@mypos.com

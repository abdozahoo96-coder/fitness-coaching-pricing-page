# Fitness Coaching Pricing Page with myPOS Integration

A modern, responsive pricing page for a fitness coaching service with integrated myPOS payment gateway.

## Features

- 💳 **myPOS Payment Integration** - Secure payment processing
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast & Modern** - Built with React + Vite + TypeScript
- 🎨 **Beautiful UI** - Tailwind CSS styling
- 💰 **Multiple Plans** - Subscription and lifetime membership options

## Prerequisites

Before you begin, you need:
- Node.js 16+ installed
- A myPOS merchant account ([Sign up here](https://www.mypos.com/))
- Your myPOS API credentials

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure myPOS

1. Log in to your [myPOS merchant account](https://www.mypos.com/)
2. Navigate to **Settings** > **API & Integrations**
3. Get your credentials:
   - **SID** (Store ID)
   - **Wallet Number**
   - **Key Index**
   - **Private Key**
   - **Public Key**

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your myPOS credentials:

```env
VITE_MYPOS_SID=your_store_id_here
VITE_MYPOS_WALLET=your_wallet_number_here
VITE_MYPOS_KEY_INDEX=1
VITE_MYPOS_PRIVATE_KEY=your_private_key_here
VITE_MYPOS_PUBLIC_KEY=your_public_key_here
VITE_MYPOS_IPC_URL=https://www.mypos.com/vmp/checkout-test
```

**Important:** 
- For testing, use: `https://www.mypos.com/vmp/checkout-test`
- For production, use: `https://www.mypos.com/vmp/checkout`

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the next available port).

## How It Works

### Payment Flow

1. **Customer selects a plan** → Clicks "Choose Plan" button
2. **App generates order** → Creates unique Order ID
3. **Redirects to myPOS** → Customer enters payment details on secure myPOS checkout page
4. **Payment processing** → myPOS processes the payment
5. **Redirect back** → Customer returns to your app:
   - Success → `/payment-success` page
   - Cancel → `/payment-cancel` page

### Project Structure

```
fitness-coaching-pricing-page/
├── components/
│   ├── PricingCard.tsx          # Individual pricing card component
│   ├── PaymentSuccess.tsx       # Payment success page
│   └── PaymentCancel.tsx        # Payment cancel page
├── services/
│   └── mypos.ts                 # myPOS payment service
├── constants.tsx                # Pricing plans configuration
├── App.tsx                      # Main app with routing
├── .env                         # Environment variables (not in git)
└── .env.example                 # Example environment variables
```

## Customization

### Update Pricing Plans

Edit `constants.tsx` to modify pricing:

```typescript
export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'sub-12',
    title: '12 Months',
    price: '$59.99',
    totalPriceSubtitle: '$5.00/month',
    badge: 'MOST POPULAR',
    icon: <CalendarIcon />,
  },
  // ... more plans
];
```

### Change Currency

In `components/PricingCard.tsx`, update the currency:

```typescript
myPOSService.initiatePayment({
  // ...
  currency: 'EUR', // Change to USD, GBP, etc.
});
```

### Customize Styling

The app uses Tailwind CSS. Modify classes in components to change styling.

## Building for Production

### 1. Update Environment Variables

Create `.env.production` with production myPOS credentials:

```env
VITE_MYPOS_IPC_URL=https://www.mypos.com/vmp/checkout
```

### 2. Build the App

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### 3. Preview Production Build

```bash
npm run preview
```

### 4. Deploy

Upload the contents of `dist/` to your web hosting provider.

**Important for deployment:**
- Set up your callback URLs in myPOS dashboard
- Update the `URL_OK`, `URL_Cancel`, and `URL_Notify` in `services/mypos.ts` to match your production domain

## Testing

### Test Mode

By default, the app uses myPOS test environment. Use test card numbers provided by myPOS:
- [myPOS Test Cards Documentation](https://developers.mypos.com/en/doc/online_payments/v1_4/173-testing)

### Common Test Cards

- **Success:** 5555 5555 5555 4444
- **Decline:** 5555 5555 5555 5551

## Security Notes

⚠️ **Never commit your `.env` file to version control!**

- The `.env` file is in `.gitignore` by default
- Only use test credentials during development
- Keep your private keys secure
- Use HTTPS in production

## myPOS Documentation

For more details on myPOS integration:
- [Online Payments Overview](https://developers.mypos.com/en/doc/online_payments/v1_4/238-online-payments)
- [Checkout API Reference](https://developers.mypos.com/en/doc/online_payments/v1_4/239-checkout-api)
- [API Call: IPCPurchase](https://developers.mypos.com/en/doc/online_payments/v1_4/21-api-call--ipcpurchase)

## Troubleshooting

### Payment not working?

1. ✅ Check your `.env` file has correct credentials
2. ✅ Verify you're using the test URL for development
3. ✅ Check browser console for errors
4. ✅ Ensure your myPOS account is active

### "Payment gateway not configured" error?

Make sure your `.env` file exists and contains valid `VITE_MYPOS_SID` and `VITE_MYPOS_WALLET` values.

### Changes not reflecting?

Restart the dev server after updating `.env`:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Support

For myPOS integration support:
- [Contact myPOS Support](https://developers.mypos.com/en/contacts)
- [myPOS Developer Documentation](https://developers.mypos.com/en/)

## License

MIT

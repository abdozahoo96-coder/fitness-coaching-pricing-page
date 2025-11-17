# Troubleshooting Guide

## Quick Fix Steps

### 1. Start the Backend Server

```bash
cd server
node index.js
```

You should see:
```
✅ myPOS payment server running on port 4000
📍 Health check: http://localhost:4000/health
🔗 API endpoint: http://localhost:4000/api/create-payment
```

### 2. Start the Frontend (in a new terminal)

```bash
npm run dev
```

### 3. Test the Integration

Run the test script to verify everything is working:

```bash
node test-mypos.js
```

## What Was Fixed

1. **Updated `services/mypos.ts`** - Now properly calls the backend API instead of showing a demo alert
2. **Added `VITE_BACKEND_URL`** to `.env` - Frontend now knows where to send payment requests
3. **Created test script** - Easy way to verify the backend is working

## Common Issues

### Issue: "Cannot connect to backend"

**Solution:** Make sure the backend server is running:
```bash
cd server
node index.js
```

### Issue: "OAuth failed" or "myPOS API error"

This could mean:
1. **Wrong API URLs** - Check `server/.env`:
   - For sandbox/test: `https://sandbox-auth-api.mypos.com` and `https://sandbox-api.mypos.com`
   - For production: `https://auth-api.mypos.com` and `https://transactions-api.mypos.com`

2. **Invalid credentials** - Double-check your Client ID and Client Secret in `server/.env`

3. **Wrong API endpoint** - myPOS REST API documentation might have changed. Current endpoint used: `/v1/transactions`

### Issue: "No checkout URL received"

The myPOS API response structure might be different than expected. Check the server logs to see what fields are actually returned.

## Testing Flow

1. Run backend: `cd server && node index.js`
2. Run test: `node test-mypos.js` (in project root)
3. Check the output - it will show you exactly what myPOS is returning
4. If you get a checkout_url or payment_url, the integration is working!

## Next Steps

If tests pass but payments still fail in the browser:
1. Open browser console (F12)
2. Try to make a payment
3. Look for errors in the console
4. Check the Network tab to see the actual request/response

## Need Help?

The test script will show you exactly what myPOS is returning. Share that output if you need help debugging further.

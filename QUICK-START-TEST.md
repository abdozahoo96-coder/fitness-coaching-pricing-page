# 🎉 Quick Start - Test myPOS Payment

## ✅ Everything is Ready!

I've set up a complete myPOS IPC integration using official test credentials. You can test payments RIGHT NOW!

---

## 🚀 Start Testing in 3 Steps:

### Step 1: Install IPC Server Dependencies

```bash
cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page/server-ipc
npm install
```

### Step 2: Start the IPC Server

```bash
# In the server-ipc directory
npm start
```

You should see:
```
🚀 myPOS IPC Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Server running on port: 4001
🔗 Health check: http://localhost:4001/health
💳 Payment API: http://localhost:4001/api/create-payment-form
🧪 Mode: TEST (using myPOS test credentials)
🌐 Test URL: https://www.mypos.com/vmp/checkout-test
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 3: Start Your React App (in a new terminal)

```bash
cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page
npm run dev
```

---

## 🎯 Test the Payment Flow:

1. **Open your app**: http://localhost:3015
2. **Click "Choose Plan"** on any pricing card
3. **You'll be redirected to myPOS test checkout**
4. **Use any valid card** (your card will NOT be charged in test mode!)
5. **Complete payment**
6. **You'll be redirected back** to your app

---

## 🧪 Test Credentials Being Used:

The server is using official myPOS test credentials:
- **SID**: 000000000000010
- **Wallet**: 61938166610  
- **Test URL**: https://www.mypos.com/vmp/checkout-test
- **Private Key**: (embedded in server)

These are public test credentials from myPOS documentation, so payments are completely safe to test!

---

## 📋 What Happens:

1. **You click "Choose Plan"** → React app calls IPC server
2. **IPC server** → Creates signed payment form with test credentials
3. **Form submits** → to myPOS test checkout page
4. **You complete payment** → on myPOS's secure page
5. **myPOS redirects back** → to your app's success/cancel page

---

## ✅ Files Created:

1. **`server-ipc/index.js`** - IPC server with test credentials
2. **`server-ipc/package.json`** - Server dependencies
3. **`services/mypos.ts`** - Updated React service for IPC
4. **`.env`** - Configuration for IPC server URL
5. **`MYPOS-TEST-CREDENTIALS.md`** - Test credentials documentation

---

## 🔧 Troubleshooting:

**Can't start server?**
- Make sure port 4001 is not in use
- Run: `lsof -ti:4001 | xargs kill -9` to free the port

**React app can't connect?**
- Make sure IPC server is running on port 4001
- Check console for errors

**Payment not redirecting?**
- Check browser console for errors
- Make sure both servers are running

---

## 🌐 Your Deployed App:

Your app is on Vercel, but the IPC server needs to be deployed too. Options:

1. **Heroku** (easiest)
2. **Railway** (good for Node.js)
3. **Your Ubuntu server** (you have one!)
4. **Vercel Serverless** (needs modification)

Once deployed, update `.env`:
```env
VITE_IPC_SERVER_URL=https://your-server-url.com
```

---

## 🎉 Ready to Test!

Run the 3 steps above and test your first payment!

**Questions?** Let me know if you get any errors!

# myPOS Payment Links Setup Guide

## ✅ Simple Payment Links Method (No Backend Required!)

This is the easiest way to integrate myPOS payments. You just create payment links in myPOS dashboard and paste them into the code.

---

## 📋 Step 1: Create Payment Links in myPOS Dashboard

1. **Log into myPOS:** https://mypos.com/

2. **Navigate to Payment Links:**
   - Go to: **Virtual POS** or **Payment Links**
   - Or: **Store** → **Payment Links**
   - Or: **Products** → **Create Payment Link**

3. **Create 10 Payment Links** (one for each plan):

### Lifetime Plans:

**Link 1 - Lifetime 1 Member ($289)**
- Product Name: `Lifetime Fitness Coaching - 1 Member`
- Amount: `289.00`
- Currency: `USD` (or your currency)
- Description: `One-time payment for lifetime access`
- Success URL: `https://yoursite.com/payment-success`
- Cancel URL: `https://yoursite.com/payment-cancel`

**Link 2 - Lifetime 2 Members ($416)**
- Product Name: `Lifetime Fitness Coaching - 2 Members`
- Amount: `416.00`
- Success/Cancel URLs same as above

**Link 3 - Lifetime 3 Members ($543)**
- Product Name: `Lifetime Fitness Coaching - 3 Members`
- Amount: `543.00`

**Link 4 - Lifetime 4 Members ($670)**
- Product Name: `Lifetime Fitness Coaching - 4 Members`  
- Amount: `670.00`

**Link 5 - Lifetime 5 Members ($797)**
- Product Name: `Lifetime Fitness Coaching - 5 Members`
- Amount: `797.00`

### Subscription Plans:

**Link 6 - 1 Month ($10.99)**
- Product Name: `1 Month Fitness Coaching Subscription`
- Amount: `10.99`

**Link 7 - 3 Months ($25.99)**
- Product Name: `3 Months Fitness Coaching Subscription`
- Amount: `25.99`

**Link 8 - 6 Months ($39.99)**
- Product Name: `6 Months Fitness Coaching Subscription`
- Amount: `39.99`

**Link 9 - 12 Months ($59.99)**
- Product Name: `12 Months Fitness Coaching Subscription`
- Amount: `59.99`

**Link 10 - 24 Months ($99.99)**
- Product Name: `24 Months Fitness Coaching Subscription`
- Amount: `99.99`

---

## 📝 Step 2: Copy All Payment Links

After creating each link, myPOS will give you a URL like:
```
https://mypos.com/vmp/checkout/abc123def456
```

**Copy all 10 links** and keep them in a text file temporarily.

---

## 💻 Step 3: Update Your Code

Open the file: `services/mypos.ts`

Find this section:
```typescript
const PAYMENT_LINKS: Record<string, string> = {
  // Lifetime Plans
  'lifetime-1': 'https://mypos.com/vmp/checkout/YOUR_LINK_1_MEMBER',
  'lifetime-2': 'https://mypos.com/vmp/checkout/YOUR_LINK_2_MEMBERS',
  // ... etc
};
```

**Replace with your actual links:**
```typescript
const PAYMENT_LINKS: Record<string, string> = {
  // Lifetime Plans
  'lifetime-1': 'https://mypos.com/vmp/checkout/abc123def456',  // Your actual link
  'lifetime-2': 'https://mypos.com/vmp/checkout/ghi789jkl012',  // Your actual link
  'lifetime-3': 'https://mypos.com/vmp/checkout/mno345pqr678',
  'lifetime-4': 'https://mypos.com/vmp/checkout/stu901vwx234',
  'lifetime-5': 'https://mypos.com/vmp/checkout/yza567bcd890',
  
  // Subscription Plans
  'sub-1': 'https://mypos.com/vmp/checkout/efg123hij456',
  'sub-3': 'https://mypos.com/vmp/checkout/klm789nop012',
  'sub-6': 'https://mypos.com/vmp/checkout/qrs345tuv678',
  'sub-12': 'https://mypos.com/vmp/checkout/wxy901zab234',
  'sub-24': 'https://mypos.com/vmp/checkout/cde567fgh890',
};
```

---

## 🚀 Step 4: Test It!

1. **Run your app:**
   ```bash
   cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page
   npm run dev
   ```

2. **Open:** http://localhost:3015

3. **Click "Choose Plan"** on any pricing card

4. **You should be redirected to myPOS checkout page**

5. **Complete payment with test card** (if in test mode)

6. **You'll be redirected back to success page**

---

## 🌐 Step 5: Deploy to Production

Once payment links are configured and working locally:

### Deploy Frontend to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page
vercel
```

During deployment, Vercel will ask:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `fitness-coaching-pricing`
- In which directory is your code located? `./`
- Want to override settings? **N**

**Your site will be live at:** `https://fitness-coaching-pricing.vercel.app`

### Update myPOS Payment Links:

After deployment, go back to myPOS and update the Success/Cancel URLs in each payment link to your actual domain:
- Success URL: `https://fitness-coaching-pricing.vercel.app/payment-success`
- Cancel URL: `https://fitness-coaching-pricing.vercel.app/payment-cancel`

---

## ✅ Advantages of Payment Links Method:

- ✅ **No backend server needed** - Just static React app
- ✅ **No complex signatures** - myPOS handles everything
- ✅ **Easy to manage** - Update prices in myPOS dashboard
- ✅ **Secure** - PCI compliant hosted checkout
- ✅ **Fast setup** - 10 minutes to configure
- ✅ **Easy deployment** - Deploy anywhere (Vercel, Netlify, etc.)

---

## 🔧 Troubleshooting:

**"Payment link not configured" error:**
- Make sure you replaced ALL `YOUR_LINK` placeholders
- Check that URLs don't have extra spaces
- Verify URLs are correct myPOS payment links

**Payment not working:**
- Check if payment links are active in myPOS
- Verify amounts match in both myPOS and your app
- Make sure you're using the correct currency

**Can't find payment links in myPOS:**
- Look for "Virtual POS", "Payment Links", or "Products"
- Contact myPOS support if option is not visible
- You may need to enable this feature on your account

---

## 📞 Need Help?

- myPOS Support: https://mypos.com/en/support
- myPOS Documentation: https://developers.mypos.com/
- Email: support@mypos.com

---

**Ready to create your payment links? Log into myPOS and start with Step 1!** 🎉

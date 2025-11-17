# Quick Product Import Guide

## ⚡ Fast Method: Import All 10 Products at Once (5 minutes)

### Step 1: Download the CSV File
The file is ready: `woocommerce-products-import.csv`

It's in your project folder: 
`/Users/abdelilahzahouani/Downloads/fitness-coaching-pricing-page/woocommerce-products-import.csv`

### Step 2: Import to WooCommerce

1. **Log into WordPress Admin**
   - Go to: https://payments.iamurtrainer.site/wp-admin

2. **Navigate to Products Import**
   - Click **Products** → **All Products**
   - Click **Import** at the top of the page

3. **Upload CSV File**
   - Click **Choose File**
   - Select `woocommerce-products-import.csv`
   - Click **Continue**

4. **Map Columns** (Usually auto-detected)
   - WooCommerce will show column mapping
   - Most columns should auto-map correctly
   - If anything is unmapped, match these:
     - Type → Type
     - SKU → SKU
     - Name → Name
     - Regular price → Regular price
     - Virtual → Virtual
     - etc.
   - Click **Run the importer**

5. **Wait for Import**
   - It should import all 10 products in a few seconds
   - You'll see a success message

6. **Verify Products**
   - Go to **Products** → **All Products**
   - You should see all 10 products listed

### Step 3: Get Product IDs

After import, you need to find each product's ID:

**Easy Method:**
1. Go to **Products** → **All Products**
2. For each product, **hover over the product name** (don't click)
3. Look at the bottom left of your browser
4. You'll see: `...post.php?post=123&action=edit`
5. The number `123` is the Product ID
6. Write it down!

**Or click each one:**
1. Click **Edit** on each product
2. Look at the URL bar: `post.php?post=123&action=edit`
3. `123` is your Product ID

### Step 4: Record All Product IDs

Fill in this table as you find each ID:

```
LIFETIME PLANS:
SKU: lifetime-1 → Product ID: _____
SKU: lifetime-2 → Product ID: _____
SKU: lifetime-3 → Product ID: _____
SKU: lifetime-4 → Product ID: _____
SKU: lifetime-5 → Product ID: _____

SUBSCRIPTION PLANS:
SKU: sub-1 → Product ID: _____
SKU: sub-3 → Product ID: _____
SKU: sub-6 → Product ID: _____
SKU: sub-12 → Product ID: _____
SKU: sub-24 → Product ID: _____
```

### Step 5: Update React App Config

Open `config.ts` and replace the zeros with your actual product IDs:

**Before:**
```typescript
const PRODUCT_IDS = {
  'LIFETIME_1': 0,
  'LIFETIME_2': 0,
  // ...
};
```

**After (example):**
```typescript
const PRODUCT_IDS = {
  'LIFETIME_1': 145,  // Your actual ID
  'LIFETIME_2': 146,  // Your actual ID
  'LIFETIME_3': 147,  // Your actual ID
  'LIFETIME_4': 148,  // Your actual ID
  'LIFETIME_5': 149,  // Your actual ID
  'SUB_1': 150,       // Your actual ID
  'SUB_3': 151,       // Your actual ID
  'SUB_6': 152,       // Your actual ID
  'SUB_12': 153,      // Your actual ID
  'SUB_24': 154,      // Your actual ID
};
```

---

## 🐌 Alternative: Manual Product Creation (30 minutes)

If CSV import doesn't work, use the manual method:

1. See `WOOCOMMERCE-PRODUCTS.md` for complete details
2. Go to **Products** → **Add New** (10 times)
3. Copy details from the markdown file
4. Record each Product ID as you create them

---

## 📋 What Each Product Looks Like

After import, each product will have:
- ✅ Product name
- ✅ Price (without $, just the number)
- ✅ SKU (for easy identification)
- ✅ Short description
- ✅ Long description
- ✅ Categories (Lifetime Plans / Subscriptions)
- ✅ Tags (where applicable)
- ✅ Virtual product (no shipping needed)

---

## ✅ After Import Checklist

- [ ] 10 products imported successfully
- [ ] All product IDs recorded
- [ ] config.ts updated with actual product IDs
- [ ] Verified products are visible in Products list
- [ ] Verified products are set as Virtual
- [ ] Verified prices are correct

---

## 🔧 Troubleshooting

**Import fails:**
- Make sure WooCommerce is installed and activated
- Try creating 1 product manually first to verify everything works
- Check that CSV file is not corrupted (open in text editor to verify)

**Products missing after import:**
- Check **Products** → **All Products**
- Check both "Published" and "Draft" tabs
- If in Draft, bulk edit them to Published

**Wrong prices:**
- Edit each product
- Update Regular Price
- Click Update

**Not showing as Virtual:**
- Edit each product
- Scroll to Product Data
- Check "Virtual" checkbox
- Click Update

---

## 🎯 Next Steps After Import

Once you have all product IDs:

1. ✅ Update `config.ts` with product IDs
2. ✅ Update `.env` with WooCommerce API keys
3. ✅ Restart React dev server: `npm run dev`
4. ✅ Test a payment!

---

**Ready to import? Go to Step 1 and start the import process!**

# Complete WooCommerce Product Setup

## All Products to Create

You have 10 products total. Here's the complete list with all details.

---

## Part 1: Lifetime Plans (5 Products)

### Product 1: Lifetime - 1 Member
```
Product Name: Lifetime Fitness Coaching - 1 Member
Regular Price: 289
SKU: lifetime-1
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: One-time payment for lifetime access
Description: Get lifetime access to our fitness coaching program for 1 member. Pay once, train forever!
Categories: Lifetime Plans
```

### Product 2: Lifetime - 2 Members
```
Product Name: Lifetime Fitness Coaching - 2 Members
Regular Price: 416
SKU: lifetime-2
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: One-time payment for 2 members
Description: Perfect for couples! Lifetime access for 2 members.
Categories: Lifetime Plans
```

### Product 3: Lifetime - 3 Members
```
Product Name: Lifetime Fitness Coaching - 3 Members
Regular Price: 543
SKU: lifetime-3
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: One-time payment for 3 members
Description: Great for small groups! Lifetime access for 3 members.
Categories: Lifetime Plans
```

### Product 4: Lifetime - 4 Members
```
Product Name: Lifetime Fitness Coaching - 4 Members
Regular Price: 670
SKU: lifetime-4
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: One-time payment for 4 members
Description: Ideal for families! Lifetime access for 4 members.
Categories: Lifetime Plans
```

### Product 5: Lifetime - 5 Members
```
Product Name: Lifetime Fitness Coaching - 5 Members
Regular Price: 797
SKU: lifetime-5
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: One-time payment for 5 members - Family Plan
Description: Our biggest family plan! Lifetime access for 5 members.
Categories: Lifetime Plans
Tags: Family Plan, Best Value
```

---

## Part 2: Subscription Plans (5 Products)

### Product 6: 1 Month Subscription
```
Product Name: 1 Month Fitness Coaching Subscription
Regular Price: 10.99
SKU: sub-1
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: $10.99 per month
Description: Try our fitness coaching with a flexible monthly subscription.
Categories: Subscriptions
```

### Product 7: 3 Months Subscription
```
Product Name: 3 Months Fitness Coaching Subscription
Regular Price: 25.99
SKU: sub-3
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: $8.66/month - Save 21%
Description: Commit to 3 months and save! Only $8.66 per month.
Categories: Subscriptions
```

### Product 8: 6 Months Subscription
```
Product Name: 6 Months Fitness Coaching Subscription
Regular Price: 39.99
SKU: sub-6
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: $6.67/month - Save 39%
Description: Half year commitment with great savings! Only $6.67 per month.
Categories: Subscriptions
```

### Product 9: 12 Months Subscription
```
Product Name: 12 Months Fitness Coaching Subscription
Regular Price: 59.99
SKU: sub-12
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: $5.00/month - Most Popular!
Description: Our most popular plan! Full year access for only $5.00 per month.
Categories: Subscriptions
Tags: Most Popular, Best Seller
```

### Product 10: 24 Months Subscription
```
Product Name: 24 Months Fitness Coaching Subscription
Regular Price: 99.99
SKU: sub-24
Product Type: Simple product
Virtual: ✅ YES
Downloadable: ❌ NO
Short Description: $4.17/month - Best Deal!
Description: The ultimate commitment! 2 years of access for only $4.17 per month.
Categories: Subscriptions
Tags: Best Deal, Maximum Savings
```

---

## Quick Add Instructions

### Step 1: Create Categories (Optional but Recommended)

1. Go to **Products** → **Categories**
2. Add these categories:
   - Name: `Lifetime Plans`
   - Name: `Subscriptions`

### Step 2: Add Products

For each product above:

1. Go to **Products** → **Add New**
2. Fill in:
   - **Product Name** (from list above)
   - **Regular Price** (from list above)
   - **Product Type**: Simple product
   - **Virtual**: ✅ Check this box
   - **SKU** (from list above - IMPORTANT for mapping!)
   - **Short Description** (from list above)
   - **Description** (from list above)
   - **Categories**: Select appropriate category
   - **Tags**: Add if specified
3. Click **Publish**
4. **WRITE DOWN THE PRODUCT ID** from the URL
   - URL will look like: `post.php?post=123&action=edit`
   - The number `123` is your Product ID

### Step 3: Record All Product IDs

After creating all 10 products, fill in this table:

```
LIFETIME PLANS:
- lifetime-1 (1 Member):    ID = _____
- lifetime-2 (2 Members):   ID = _____
- lifetime-3 (3 Members):   ID = _____
- lifetime-4 (4 Members):   ID = _____
- lifetime-5 (5 Members):   ID = _____

SUBSCRIPTION PLANS:
- sub-1 (1 Month):          ID = _____
- sub-3 (3 Months):         ID = _____
- sub-6 (6 Months):         ID = _____
- sub-12 (12 Months):       ID = _____
- sub-24 (24 Months):       ID = _____
```

---

## Alternative: Bulk Import via CSV

If you want to import all products at once, I can create a CSV file for you.

### Steps for CSV Import:

1. Download the CSV file I'll create
2. Go to **Products** → **All Products**
3. Click **Import** at the top
4. Upload the CSV file
5. Map columns
6. Run the import
7. Check the products were created correctly

**Would you like me to create the CSV import file?**

---

## After Creating Products

Once you have all 10 products created with their IDs, we'll update your React app's `config.ts` file with all the product mappings.

---

## Tips for Fast Product Creation

1. **Use Duplicate Feature:**
   - Create first product completely
   - Click **Duplicate** from Products list
   - Just change the name, price, SKU
   - Much faster than creating from scratch!

2. **Keep a Notepad:**
   - As you create each product, immediately write down:
     - SKU: lifetime-1
     - Product ID: 123
   - This saves time later

3. **Verify Virtual is Checked:**
   - Virtual products don't require shipping
   - Makes checkout faster
   - Essential for digital/service products

---

**Ready to start creating products? Or would you like me to create a CSV import file instead?**

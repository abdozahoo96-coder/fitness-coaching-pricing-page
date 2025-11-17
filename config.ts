import { myPOSService } from './services/mypos';

/**
 * Configure WooCommerce Product IDs
 * 
 * After importing products to WooCommerce, update these IDs:
 * 
 * METHOD 1: Check product IDs in WordPress
 * 1. Go to WordPress Admin → Products → All Products
 * 2. Hover over each product name
 * 3. Look at the bottom left of your browser - you'll see: post=XXX
 * 4. XXX is the product ID
 * 
 * METHOD 2: Edit each product
 * 1. Click Edit on each product
 * 2. Check the URL: post.php?post=XXX → XXX is the product ID
 */

// TODO: Update these with your actual WooCommerce product IDs after import
const PRODUCT_IDS = {
  // Lifetime Plans
  'LIFETIME_1': 0,  // Product ID for "Lifetime - 1 Member"
  'LIFETIME_2': 0,  // Product ID for "Lifetime - 2 Members"
  'LIFETIME_3': 0,  // Product ID for "Lifetime - 3 Members"
  'LIFETIME_4': 0,  // Product ID for "Lifetime - 4 Members"
  'LIFETIME_5': 0,  // Product ID for "Lifetime - 5 Members"
  
  // Subscription Plans
  'SUB_1': 0,   // Product ID for "1 Month Subscription"
  'SUB_3': 0,   // Product ID for "3 Months Subscription"
  'SUB_6': 0,   // Product ID for "6 Months Subscription"
  'SUB_12': 0,  // Product ID for "12 Months Subscription"
  'SUB_24': 0,  // Product ID for "24 Months Subscription"
};

// Map product IDs to plan IDs used in your React app
// Lifetime Plans
myPOSService.setProductMapping('lifetime-1', PRODUCT_IDS.LIFETIME_1);
myPOSService.setProductMapping('lifetime-2', PRODUCT_IDS.LIFETIME_2);
myPOSService.setProductMapping('lifetime-3', PRODUCT_IDS.LIFETIME_3);
myPOSService.setProductMapping('lifetime-4', PRODUCT_IDS.LIFETIME_4);
myPOSService.setProductMapping('lifetime-5', PRODUCT_IDS.LIFETIME_5);

// Subscription Plans
myPOSService.setProductMapping('sub-1', PRODUCT_IDS.SUB_1);
myPOSService.setProductMapping('sub-3', PRODUCT_IDS.SUB_3);
myPOSService.setProductMapping('sub-6', PRODUCT_IDS.SUB_6);
myPOSService.setProductMapping('sub-12', PRODUCT_IDS.SUB_12);
myPOSService.setProductMapping('sub-24', PRODUCT_IDS.SUB_24);

// Example of how to update (replace 0 with actual IDs):
// const PRODUCT_IDS = {
//   'LIFETIME_1': 145,  // Replace with actual ID
//   'LIFETIME_2': 146,  // Replace with actual ID
//   ...
// };

export default PRODUCT_IDS;

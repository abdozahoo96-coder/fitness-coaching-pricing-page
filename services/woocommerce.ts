import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize WooCommerce API
const WooCommerce = new WooCommerceRestApi({
  url: "https://payments.iamurtrainer.site",
  consumerKey: import.meta.env.VITE_WOOCOMMERCE_KEY || "",
  consumerSecret: import.meta.env.VITE_WOOCOMMERCE_SECRET || "",
  version: "wc/v3",
  queryStringAuth: true // Force Basic Authentication for HTTPS
});

export interface CreateOrderData {
  productId: number;
  planTitle: string;
  amount: string;
  customerEmail?: string;
}

export async function createOrder(data: CreateOrderData) {
  try {
    console.log('🛒 Creating WooCommerce order...', {
      productId: data.productId,
      planTitle: data.planTitle,
      amount: data.amount
    });

    const orderData = {
      payment_method: "mypos_virtual",
      payment_method_title: "myPOS Checkout",
      set_paid: false,
      status: "pending",
      billing: {
        email: data.customerEmail || "customer@example.com",
        first_name: "Fitness",
        last_name: "Customer"
      },
      line_items: [
        {
          product_id: data.productId,
          quantity: 1
        }
      ]
    };

    const response = await WooCommerce.post("orders", orderData);
    
    console.log('✅ Order created:', response.data.id);

    // Get checkout URL
    const checkoutUrl = `https://payments.iamurtrainer.site/checkout/order-pay/${response.data.id}/?pay_for_order=true&key=${response.data.order_key}`;

    return {
      success: true,
      orderId: response.data.id,
      checkoutUrl: checkoutUrl
    };
  } catch (error: any) {
    console.error("❌ Error creating order:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

export default WooCommerce;

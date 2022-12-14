const axios = require("axios");

class PaymentService {
  async createPayment(req) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      items: req.body,
      back_urls: {
        success: "http://localhost:3001/products",
        failure: "http://localhost:3001/products",
        pending: "http://localhost:3001/products",
      },
      notifi_url: "https://www.your-site.com/ipn",
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";
    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_1709244@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return subscription.data;
  }
}

module.exports = PaymentService;

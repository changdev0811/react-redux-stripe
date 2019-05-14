const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_UZmF3jwFi0t0MFhnC4gy9XBP'
    : 'sk_test_UZmF3jwFi0t0MFhnC4gy9XBP';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_SLuNwYFnPAiKoM3xXB5LJzBW'
  : 'pk_test_SLuNwYFnPAiKoM3xXB5LJzBW';

export default STRIPE_PUBLISHABLE;

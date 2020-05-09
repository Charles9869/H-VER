export const formatPriceForHumans = price =>
  (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

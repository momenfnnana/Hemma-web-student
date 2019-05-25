/**
 * Formats the price (in cents) to be in SAR
 *
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  if (price === null || price === undefined) {
    return "";
  }
  return parseFloat(price.toFixed(2));
}

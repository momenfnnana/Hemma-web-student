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

    if (price % 100 === 0) return (price / 100).toString();

    return (price / 100).toFixed(2);
}

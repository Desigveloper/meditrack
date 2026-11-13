const EXPIRY_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Checks whether a stock item has valid required fields and pricing.
 *
 * @param {Object} item - The stock item to validate.
 * @param {string} item.name - The item's name.
 * @param {number} item.quantity - A positive whole-number quantity.
 * @param {number} item.costPrice - A positive cost price.
 * @param {number} item.sellingPrice - A positive selling price greater than the cost price.
 * @returns {string|null} An error message if invalid; otherwise, `null`.
 */
export function validateStockItem(item) {
    if (!item.name || !item.quantity) {
        return "name and quantity are required";
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return "quantity should be a positive whole number";
    }

    if (
        typeof item.costPrice !== "number" ||
        typeof item.sellingPrice !== "number" ||
        item.costPrice <= 0 ||
        item.sellingPrice <= 0
    ) {
        return "selling price and cost price must be positive numbers";
    }

    if (item.sellingPrice <= item.costPrice) {
        return "selling price must be greater than cost price.";
    }

    if (typeof item.expiryDate !== "string" || !EXPIRY_DATE_PATTERN.test(item.expiryDate)) {
        return "expiry date must be a valid date in YYYY-MM-DD format";
    }

    const [year, month, day] = item.expiryDate.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);
    const isValidDate =
        parsed.getFullYear() === year &&
        parsed.getMonth() === month - 1 &&
        parsed.getDate() === day;

    if (!isValidDate) {
        return "expiry date must be a real calendar date in YYYY-MM-DD format";
    }

    return null;
}
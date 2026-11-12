const LOW_STOCK_THRESHOLD = 20;
const EXPIRY_WARNING_DAYS = 30;

// A internal Helper other modules would never need
function daysUntil(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const expiry = new Date(year, month - 1, day);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());


    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    return Math.round((expiry - today) / MS_PER_DAY);
}

export function getAlerts(item) {
    const alerts = [];
    const days = daysUntil(item.expiryDate);

    if (days < 0) {
        alerts.push("expired");
    } else if (days <= EXPIRY_WARNING_DAYS) {
        alerts.push("expiring soon");
    }

    if (item.quantity <= LOW_STOCK_THRESHOLD) {
        alerts.push("low stock");
    }

    return alerts;
}
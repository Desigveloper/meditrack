import { useState, useEffect } from "react";

// Base URL for the inventory service.
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches and displays the authenticated user's inventory.
 * @param {{ user: { getIdToken: () => Promise<string> } }} props
 */
function Inventory({ user }) {
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Avoid updating state if this request finishes after unmounting.
        let cancelled = false;

        async function loadStock() {
            try {
                // Include the user's ID token to authorize the stock request.
                const token = await user.getIdToken();
                const response = await fetch(`${API_URL}/stock`, {
                    headers: { Authorization: `Bearer ${token}`}
                });

                if(!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();

                // Apply the response only while this effect is still active.
                if(!cancelled) {
                    setStock(data);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (fetchError) {
                if(!cancelled) {
                    setError("Could not load inventory. Is the backend running");
                }
            } finally {
                if(!cancelled) {
                    setLoading(false);
                }
            }
        }
        loadStock();

        // Mark this effect inactive when it is cleaned up.
        return () => {
            cancelled = true;
        };
    }, [error, user]);

    if (loading) return <p>Loading Inventory</p>
    if (error) return <p>{error}</p>
    
    // Show each inventory item with its quantity, price, and expiry date.
    return (
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Selling Price (GH₵)</th>
                <th>Expiry Date</th>
            </tr>
        </thead>
        <tbody>
            {stock.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.sellingPrice}</td>
                    <td>{item.expiryDate}</td>
                </tr>
            ))}
        </tbody>
      </table>  
    );
}

export default Inventory;
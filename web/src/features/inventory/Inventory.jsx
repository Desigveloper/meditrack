import { useState, useEffect, useRef, useCallback } from "react";
import AddStockForm from "./AddStockForm.jsx";
import { getAlerts } from "./alerts.js";
import "../../styles/badge.css"


// Base URL for the inventory service.
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("VITE_API_URL environment variable is not set. Please define it in your .env file.");
}

/**
 * Fetches and displays the authenticated user's inventory.
 * @param {{ user: { getIdToken: () => Promise<string> } }} props
 */
function Inventory({ user }) {
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadGeneration = useRef(0); // To track the latest load request

    const loadStock = useCallback(async () => {
        const generation = ++loadGeneration.current; // Increment the generation for this load


        try {
            // Include the user's ID token to authorize the stock request.
            const token = await user.getIdToken();

            if (loadGeneration.current === generation) {
                // If a newer load request has been initiated, abort this one.
                setLoading(true);
                setError(null);
            }

            const response = await fetch(`${API_URL}/stock`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (loadGeneration.current === generation) { // Only update state if this is the latest load
                setStock(data);
            }

        } catch (loadError) {
            console.error("Failed to load inventory:", loadError);
            if (loadGeneration.current === generation) { // Only update state if this is the latest load
                setError("Could not load inventory. Is the backend running?");
            }
        } finally {
            if (loadGeneration.current === generation) {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        // set-state-in-effect: all state updates in loadStock occur after await.
        // (async transitions), guarded by the generation counter. The rule cannot
        // trace through the awaits and reports a false positive here.
        // eslint-disable-next-line react-hooks/set-state-in-effect 
        loadStock();
    }, [loadStock]);



    // Show each inventory item with its quantity, price, and expiry date.
    return (
        <>
            {error && <p>{error}</p>}
            {loading && stock.length === 0 && !error && <p>Loading inventory...</p>}
            {!loading && stock.length === 0 && !error && <p>No stock items found. Add some below.</p>}
            <AddStockForm user={user} onCreated={loadStock} />
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
                            <td>{typeof item.sellingPrice === "number" ? item.sellingPrice.toFixed(2) : item.sellingPrice}</td>
                            <td>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : ""}</td>
                            <td>
                                {getAlerts(item).map((alert) => (
                                    <span key={alert} className={`badge badge-${alert.replace(" ", "-")}`}>
                                        {alert}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default Inventory;
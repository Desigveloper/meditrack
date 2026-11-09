import { useState, useEffect } from "react";

const API_URL = "http://localhost:4000";

function Inventory({ user }) {
    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadStock() {
            try {
                const token = await user.getIdToken();
                const response = await fetch(`${API_URL}/stock`, {
                    headers: { Authorization: `Bearer ${token}`}
                });

                if(!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();

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

        return () => {
            cancelled = true;
        };
    }, [error, user]);

    if (loading) return <p>Loading Inventory</p>
    if (error) return <p>{error}</p>
    
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
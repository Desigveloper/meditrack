import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AddStockForm({ user, onCreated }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSaving(true);

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${API_URL}/stock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    quantity: Number(quantity),
                    sellingPrice: Number(sellingPrice),
                    costPrice: Number(costPrice),
                    expiryDate
                })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Could not save the record");
                return;
            }
            onCreated();

            setName("");
            setQuantity("");
            setSellingPrice("");
            setCostPrice("");
            setExpiryDate("");
        // eslint-disable-next-line no-unused-vars
        } catch (submitError) {
            setError("Could not save stock. Is the backend running?");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Stock</h2>
            { error && <p>{error}</p>}
            <input value={name} onChange={(event) => setName(event.target.value)} 
                placeholder="Name" required/>

            <input type="number" value={quantity} onChange={(event) =>
            setQuantity(event.target.value)} placeholder="Quantity" required/>

            <input type="number" value={sellingPrice} step="0.01" onChange={(event) => 
            setSellingPrice(event.target.value)} placeholder="Selling price (GH₵)" required/>

            <input type="number" value={costPrice} step="0.01" onChange={(event) =>
            setCostPrice(event.target.value)} placeholder="Cost price (GH₵)" required/>

            <input type="date" value={expiryDate} onChange={(event) =>
            setExpiryDate(event.target.value)} required/>

            <button type="submit" disabled={saving}>{saving ? "Saving..." : "Add record"}</button>
        </form>
    )
}


export default AddStockForm;
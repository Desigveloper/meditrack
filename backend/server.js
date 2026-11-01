import "dotenv/config";
import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

app.get("/health", (request, response) => {
    response.json({status: "ok"});
});

app.post("/stock", async (request, response) => {
    const item = request.body;

    if(!item.name || !item.quantity) {
        return response.status(400).json({error: "name and quantity are required"});
    }

    if(!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return response.status(400).json({error: "quantity should be a positive whole number"});
    }

    try {  
        const newItem = {...item, updatedAt: new Date().toISOString()};
        const doc = await db.collection("stock").add(newItem);
        response.status(201).json({id: doc.is, ...newItem});
    } catch (error) {
        console.error("Failed to save stock item:", error);
        response.status(500).json({error: "internal server error"});
    }
});

app.get("/stock", (request, response) => {
    response.json(stock);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});
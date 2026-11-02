import "dotenv/config";
import express from "express";
import db from "./db.js";
import { requireAuth } from "./middleware/auth.js";



const app = express();
app.use(express.json());
app.use("/stock", requireAuth);

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

    if (!Number(item.costPrice) || !Number(item.sellingPrice)) {
        return response.status(400).json({error: "selling price and cost price are required"});
    }

    if (sellingPrice <= costPrice ) {
        return response.status(400).json({error: "Wrong pricing. cost price greater than selling price."});
    }

    try {  
        const newItem = {...item, updatedAt: new Date().toISOString()};
        const doc = await db.collection("stock").add(newItem);
        response.status(201).json({id: doc.id, ...newItem});
    } catch (error) {
        console.error("Failed to save stock item:", error);
        response.status(500).json({error: "internal server error"});
    }
});

app.get("/stock", async(request, response) => {
    try {
        const snapshot = await db.collection("stock").get();
        const stock = [];
        snapshot.forEach((doc) => {
            stock.push({id: doc.id, ...doc.data()});
        });

        response.json(stock);
    } catch (error) {
        console.error("Failed to load stock", error);
        response.status(500).json({error: "internal server error"});
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});
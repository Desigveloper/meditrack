const express = require("express");

const app = express();

app.use(express.json());

const PORT =  4000;

const stock = [];

app.post("/stock", (request, response) => {
    const item = request.body;
    if(!item.name || !item.quantity) {
        return response.status(400).json({error: "name and quantity are required"});
    }

    if(!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return response.status(400).json({error: "quantity should be a positive whole number"});
    }

    const newItem = {
        id: stock.length + 1,
        ...item,
        updatedAt: new Date().toISOString()
    }

    stock.push(newItem);
    response.status(201).json(newItem);
});

app.get("/stock", (request, response) => {
    response.json(stock);
});

app.get("/health", (request, response) => {
    response.json({status: "ok"});
});

app.listen(PORT, () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});
import "dotenv/config";
import express from "express";
import { db }from "./db.js";
import { requireAuth } from "./middleware/auth.js";
import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "./db.js";

/**
 * MediTrack inventory API.
 * Provides a public health check and authenticated stock management endpoints.
 * Requires the database and authentication configuration supplied by the project.
 */

const app = express();
app.use(express.json());
app.use("/stock", requireAuth);

const auth = getAuth(firebaseApp);

app.post("/auth/register", async(request, response) => {
    const {email, password, displayName} = request.body;

    if(!email || !password) {
        return response.status(400).json({error: "email and password are required"});
    }

    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: displayName || email
        });
        response.status(201).json({uid: userRecord.uid, email: userRecord.email});
    } catch (error) {
        if(error.code === "auth/email-already-exists") {
            return response.status(409).json({error: "an account with email already exists"});
        }

        if (error.code === "auth/invalid-email") {
            return response.status(400).json({error: "invalid email or password " +
                "(minimum 6 characters)"});
        }

        console.error("Registration failed:", error.code);
        request.status(500).json({error: "internal server error"});
    }
});


/** Check whether the API is running. */
app.get("/health", (request, response) => {
    response.json({ status: "ok" });
});

/**
 * Create a stock item.
 * Expects name, positive integer quantity, and positive cost/selling prices
 * where the selling price exceeds the cost price.
 */
app.post("/stock", async (request, response) => {
    const item = request.body;

    if (!item.name || !item.quantity) {
        return response.status(400).json({ error: "name and quantity are required" });
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return response.status(400).json({ error: "quantity should be a positive whole number" });
    }

    if (
        typeof item.costPrice !== "number" ||
        typeof item.sellingPrice !== "number" ||
        item.costPrice <= 0 ||
        item.sellingPrice <= 0
    ) {
        return response.status(400).json({ error: "selling price and cost price must be positive numbers" });
    }

    if (item.sellingPrice <= item.costPrice) {
        return response.status(400).json({ error: "selling price must be greater than cost price." });
    }

    try {
        const newItem = { 
            ...item,
            ownerId: request.user.uid, 
            updatedAt: new Date().toISOString()
        };

        const doc = await db.collection("stock").add(newItem);
        response.status(201).json({ id: doc.id, ...newItem });
    } catch (error) {
        console.error("Failed to save stock item:", { item, error });
        response.status(500).json({ error: "internal server error" });
    }
});

/** Return all stock items. */
app.get("/stock", async (request, response) => {
    try {
        const snapshot = await db
        .collection("stock")
        .where("ownerId", "==", request.user.uid)
        .get();
        
        const stock = [];
        snapshot.forEach((doc) => {
            stock.push({ id: doc.id, ...doc.data() });
        });

        response.json(stock);
    } catch (error) {
        console.error("Failed to load stock", error);
        response.status(500).json({ error: "internal server error" });
    }
});

// The PORT environment variable can be set to specify the server's listening port.
// If not set, the server will default to port 4000.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});
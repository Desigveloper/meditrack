import "dotenv/config";
import express from "express";
import { db }from "./db.js";
import { requireAuth } from "./middleware/auth.js";
import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "./db.js";
import {validateStockItem} from "./validators/stock.js";

/**
 * MediTrack inventory API.
 * Provides a public health check and authenticated stock management endpoints.
 * Requires the database and authentication configuration supplied by the project.
 */

const app = express();
app.use(express.json());
app.use("/stock", requireAuth);

const auth = getAuth(firebaseApp);

/**
 * Register a new user.
 * Expects: { email, password, displayName? }
 * Returns: { uid, email } on success.
 *   - uid: The unique user ID assigned by Firebase.
 *   - email: The registered email address.
 */
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
        response.status(500).json({error: "internal server error"});
    }
});

/* Create a stock item.
 * Expects name, positive integer quantity, and positive cost/selling prices
 * where the selling price exceeds the cost price.
 * 
 * Returns: JSON object with the following fields on success:
 *   - id: The unique identifier of the created stock item.
 *   - name, quantity, costPrice, sellingPrice, ownerId, updatedAt: All fields of the created item.
 */
app.post("/stock", async (request, response) => {
    const item = request.body;
    delete item.ownerId; // Prevent changing the ownerId
    const validationError = validateStockItem(item);
    
    
    if (!request.user || !request.user.uid) {
        return response.status(401).json({ error: "Unauthorized: user not authenticated" });
    }
    
    if (validationError) {
        return response.status(400).json({ error: validationError });
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

/**
 * Update an existing stock item owned by the authenticated user.
 * Expects the stock fields to update in the request body; ownerId is ignored.
 * The merged item must have a name, positive integer quantity, positive cost
 * and selling prices, and a selling price greater than the cost price.
 * Returns 404 if the item does not exist, 403 if it belongs to another user,
 * 400 for invalid stock data, or 500 if the update fails.
 */
app.put("/stock/:id", async (request, response) => {
    const { id } = request.params;
    const updatedData = request.body;

    // Prevent changing the ownerId
    delete updatedData.ownerId;


    try {
        const docRef = db.collection("stock").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return response.status(404).json({ error: "Stock item not found" });
        }

        const record = doc.data();
        if (record.ownerId !== request.user.uid) {
            return response.status(403).json({ error: "Forbidden: you do not have permission to" +
                " modify this stock item" });
        }

        const updatedItem = {
            ...record,
            ...updatedData,
            updatedAt: new Date().toISOString()
        };

        const validationError = validateStockItem(updatedItem);
        if (validationError) {
            return response.status(400).json({ error: validationError });
        }

        await docRef.update(updatedItem);
        response.json({ id, ...updatedItem });
    } catch (error) {
        console.error("Failed to update stock item:", error);
        response.status(500).json({ error: "internal server error" });
    }
});

/**
 * List all stock items for the authenticated user.
 * Response: Array of stock items, each with:
 *   - id: string (document ID)
 *   - name: string
 *   - quantity: integer
 *   - costPrice: number
 *   - sellingPrice: number
 *   - ownerId: string (user UID)
 *   - updatedAt: string (ISO date)
 *   - ...any other fields stored with the item
 * Example:
 * [
 *   {
 *     "id": "abc123",
 *     "name": "Paracetamol",
 *     "quantity": 10,
 *     "costPrice": 5.0,
 *     "sellingPrice": 7.5,
 *     "ownerId": "userUid",
 *     "updatedAt": "2024-06-01T12:00:00.000Z"
 *   }
 * ]
 */
app.get("/stock", async (request, response) => {
    if (!request.user || !request.user.uid) {
        return response.status(401).json({ error: "Unauthorized: user not authenticated" });
    }
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
const server = app.listen(PORT);

server.on("listening", () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});

server.on("error", (error) => {
    console.error(`MediTrack API failed to listen on port ${PORT}:`, error);
    process.exitCode = 1;
});
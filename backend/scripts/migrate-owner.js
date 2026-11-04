import "dotenv/config";
import { db } from "../db.js";

const OWNER_UID = "IEfT0zmo4nM20IhvVRlxNx3sd7E3"; // Replace with the actual owner UID

const snapshot = await db.collection("stock").get();

let migrated = 0;

for (const doc of snapshot.docs)  {
    if(!doc.data().ownerId) {
        await doc.ref.update({ ownerId: OWNER_UID });
        migrated++;
    }
}

console.log(`Migration complete. ${migrated} documents updated with ownerId.`);
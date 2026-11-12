import "dotenv/config";
import { db } from "../src/config/firebase.js";

// Set OWNER_UID to the correct user ID from your authentication system 
// (e.g., Firebase Auth UID or your user management dashboard)
const OWNER_UID = "IEfT0zmo4nM20IhvVRlxNx3sd7E3";

(async () => {
    const snapshot = await db.collection("stock").get();
let migrated = 0;
const updatePromises = [];

for (const doc of snapshot.docs)  {
    if(!doc.data().ownerId) {
        updatePromises.push(doc.ref.update({ ownerId: OWNER_UID }));
        migrated++;
    }
}

await Promise.all(updatePromises);
console.log(`Migration complete. ${migrated} documents updated with ownerId.`);
})();
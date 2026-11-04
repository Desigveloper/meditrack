import fs from "fs";

try {
    const keyBase64 = fs.readFileSync("serviceAccountKey.json").toString("base64");
    console.log(keyBase64);
} catch (error) {
    console.error("Error reading the service account key file:", error);
    console.error("Ensure that 'meditrackServiceAccountKey.json' exists in the backend directory.");
}
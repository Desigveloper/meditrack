import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);

server.on("listening", () => {
    console.log(`MediTrack API listening on port ${PORT}`);
});

server.on("error", (error) => {
    console.error(`MediTrack API failed to listen on port ${PORT}:`, error);
    process.exitCode = 1;
});

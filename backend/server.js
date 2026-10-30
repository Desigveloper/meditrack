const express = require("express");

const app = express();

app.use(express.json());

const PORT =  4000;

app.get("/health", (request, response) => {
    response.json({status: "ok"});
});

app.listen(PORT, () => {
    console.log(`MediTrack listening on port ${PORT}`);
});
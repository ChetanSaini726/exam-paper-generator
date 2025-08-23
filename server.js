import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ALLOWED_ORIGINS, PORT } from "./utils/config.js"

import examRoutes from "./routes/examRoutes.js";

const app = express();

function server(){
    try {
        app.use(cors({ origin: ALLOWED_ORIGINS }));
        app.use(express.json());

        app.use(morgan("combined"));

        // POST /api/generat-exam
        app.use("/api", examRoutes);

        app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
    } catch (err){
        console.error("Unexpected Error Occurred: ", err);
    }
}

server();
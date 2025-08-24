import express from "express";
import cors from "cors";
import morgan from "morgan";

async function server(){
    try {
        const env = (await import("./utils/config.js")).default;
        const examRoutes = (await import("./routes/examRoutes.js")).default;
        
        const app = express();
        app.use(cors({ origin: env.ALLOWED_ORIGIN }));
        app.use(express.json());
        app.use(morgan("common"));


        // POST /api/generat-exam
        app.use("/api", examRoutes);

        app.listen(env.PORT, () => console.log(`Backend running at http://localhost:${env.PORT}`));
    } catch (err){
        console.error("Unexpected Error Occurred: ", err);
    }
}

await server();
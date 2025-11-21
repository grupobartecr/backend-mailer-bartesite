import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", emailRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor levantado en puerto ${process.env.PORT}`);
});

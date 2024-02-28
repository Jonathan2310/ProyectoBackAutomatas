import express from "express";
import userRoutes from "./routes/users.js";
import proyectoRoutes from "./routes/proyectos.js";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors());

app.use("/user", userRoutes)
app.use("/proyecto", proyectoRoutes)

app.listen(8800)
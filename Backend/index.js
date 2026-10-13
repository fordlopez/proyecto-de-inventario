import "dotenv/config";
import express from "express";
import { logger } from "./src/middleware/niddlewarelogger.js";
import { errorHandler } from "./src/errorHander.js";
import { pool } from "./src/configuraciones/database.js";
import cors from "cors"
import { inventarioRouter } from "./src/router/inventarioRouter.js";



const app = express();


app.use(cors({
  origin:"http://localhost:5175" 
}))


app.use(express.json());
app.use(logger);

app.use("/api/inventario", inventarioRouter);

app.use(errorHandler);


const PORT = process.env.PORT || 9000;

try {
    await pool.query("select 1");
    console.log("PostgreSQL conectado");

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
} catch (error) {
    console.log("error al conectar", error.message);
    await pool.end();
}
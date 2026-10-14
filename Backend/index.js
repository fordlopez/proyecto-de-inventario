import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./src/middleware/loggerMiddleware.js";
import { errorHandler, rutaNoEncontrada } from "./src/middleware/errorHandler.js";
import { pool } from "./src/configuraciones/database.js";
import { productosRouter } from "./src/router/productosRouter.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json());
app.use(logger);

app.use("/api/productos", productosRouter);

// Después de las rutas: 404 para rutas desconocidas y manejador central de errores
app.use(rutaNoEncontrada);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL conectado");

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Error al conectar con PostgreSQL:", error.message);
    await pool.end();
    process.exit(1);
}

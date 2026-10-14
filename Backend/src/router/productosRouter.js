import { Router } from "express";
import {
    deleteProducto,
    getProductoPorId,
    getProductos,
    postProducto,
    putProducto
} from "../controllers/productosController.js";
import { validarSchema } from "../middleware/validarSchemas.js";
import {
    actualizarProductoSchema,
    crearProductoSchema,
    idParamsSchema
} from "../schemas/productoSchemas.js";

const productosRouter = Router();

productosRouter.get("/", getProductos);

productosRouter.get(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    getProductoPorId
);

productosRouter.post(
    "/",
    validarSchema(crearProductoSchema),
    postProducto
);

productosRouter.put(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    validarSchema(actualizarProductoSchema),
    putProducto
);

productosRouter.delete(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    deleteProducto
);

export { productosRouter };
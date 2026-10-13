import { Router } from "express";
import { deleteProductoController, getProductos, getProductosId, postCrear, putActualizar } from "../contralle/inventariocontralle.js";
import { validarSchema } from "../middleware/validarSchemas.js";
import { actualizarProductoSchema, crearProductoSchema, idParamsSchema } from "../schemas/userSchemas.js";



const inventarioRouter = Router();

inventarioRouter.get("/", getProductos);

inventarioRouter.get(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    getProductosId
);

inventarioRouter.post(
    "/",
    validarSchema(crearProductoSchema),
    postCrear
);

inventarioRouter.put(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    validarSchema(actualizarProductoSchema),
    putActualizar
);

inventarioRouter.delete(
    "/:id",
    validarSchema(idParamsSchema, "params"),
    deleteProductoController
);

export { inventarioRouter };

import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    listarProductos,
    obtenerProductoPorId
} from "../repositories/productosRepository.js";

const getProductos = async (req, res, next) => {
    try {
        const productos = await listarProductos();
        res.status(200).json({ data: productos });
    } catch (error) {
        next(error);
    }
};

const getProductoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: `No existe un producto con el ID ${id}`
            });
        }

        res.status(200).json({ data: producto });
    } catch (error) {
        next(error);
    }
};

const postProducto = async (req, res, next) => {
    try {
        const producto = await crearProducto(req.body);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            data: producto
        });
    } catch (error) {
        next(error);
    }
};

const putProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await actualizarProducto(id, req.body);

        if (!producto) {
            return res.status(404).json({
                mensaje: `No existe un producto con el ID ${id}`
            });
        }

        res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            data: producto
        });
    } catch (error) {
        next(error);
    }
};

const deleteProducto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const producto = await eliminarProducto(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: `No existe un producto con el ID ${id}`
            });
        }

        res.status(200).json({
            mensaje: "Producto eliminado correctamente",
            data: producto
        });
    } catch (error) {
        next(error);
    }
};

export {
    getProductos,
    getProductoPorId,
    postProducto,
    putProducto,
    deleteProducto
};

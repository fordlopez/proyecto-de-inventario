import { deleteProducto, getDIproductos, getTProductos, postCrearProducto, putActualizarProducto } from "../Repositories/inventarioRepositories.js";


const getProductos = async (req, res, next) => {
    try {
        const inventario = await getTProductos();
        res.status(200).json({ data: inventario });
    } catch (error) {
        next(error);
    }
};

const getProductosId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const producto = await getDIproductos(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: `No existe un producto con el ID ${id}`
            });
        }

        return res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};



const postCrear = async (req, res, next) => {
    try {
        const {
            codigo,
            nombre,
            descripcion,
            categoria,
            marca,
            precio,
            stock,
            estado,
            fecha_creacion
        } = req.body;

        const crearProducto = await postCrearProducto(
            codigo,
            nombre,
            descripcion,
            categoria,
            marca,
            precio,
            stock,
            estado,
            fecha_creacion
        );

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            data: crearProducto
        });

    } catch (error) {
        next(error);
    }
};

const putActualizar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            codigo,
            nombre,
            descripcion,
            categoria,
            marca,
            precio,
            stock,
            estado,
            fecha_creacion
        } = req.body;

        const productoActualizado = await putActualizarProducto(
            id,
            codigo,
            nombre,
            descripcion,
            categoria,
            marca,
            precio,
            stock,
            estado,
            fecha_creacion
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            data: productoActualizado
        });
    } catch (error) {
        next(error);
    }
};



const deleteProductoController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productoEliminado = await deleteProducto(id);

        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto eliminado correctamente",
            data: productoEliminado
        });

    } catch (error) {
        next(error);
    }
};



export { getProductos, getProductosId, postCrear, putActualizar, deleteProductoController };
import { pool } from "../configuraciones/database.js";

/////ver todos los productos
const getTProductos = async () => {
    try {
        const result = await pool.query("select  * from inventario ");
        return result.rows;
    } catch (error) {
        throw new Error("hubo un error al intentar conectar con la db");
    }
};

/////ver producto por id
const getDIproductos = async (id) => {
    const query = `
        SELECT *
        FROM inventario
        WHERE categoria_id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

///////ve registrar un producto 

const postCrearProducto = async (
    codigo,
    nombre,
    descripcion,
    categoria,
    marca,
    precio,
    stock,
    estado,
    fecha_creacion
) => {
    const query = `
    INSERT INTO inventario (
    codigo, nombre, descripcion, categoria,
    marca, precio, stock, estado, fecha_creacion
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
RETURNING *
    `;

    const values = [
        codigo,
        nombre,
        descripcion,
        categoria,
        marca,
        precio,
        stock,
        estado,

    ];

    const result = await pool.query(query, values);

    return result.rows;
};




/// Editar producto
const putActualizarProducto = async (
    id,
    codigo,
    nombre,
    descripcion,
    categoria,
    marca,
    precio,
    stock,
    estado
) => {
    const query = `
        UPDATE inventario
        SET
            codigo = $1,
            nombre = $2,
            descripcion = $3,
            categoria = $4,
            marca = $5,
            precio = $6,
            stock = $7,
            estado = $8
        WHERE categoria_id = $9
        RETURNING *
    `;

    const values = [
        codigo,
        nombre,
        descripcion,
        categoria,
        marca,
        precio,
        stock,
        estado,
        id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

////eliminar producto 
const deleteProducto = async (id) => {
    const query = `
        DELETE FROM inventario
        WHERE categoria_id = $1
        RETURNING *
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};


export { getTProductos, getDIproductos, postCrearProducto, putActualizarProducto, deleteProducto };
import { pool } from "../configuraciones/database.js";


const listarProductos = async () => {
    const result = await pool.query("SELECT * FROM productos ORDER BY id");
    return result.rows;
};

const obtenerProductoPorId = async (id) => {
    const result = await pool.query(
        "SELECT * FROM productos WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

const crearProducto = async ({
    codigo, nombre, descripcion, categoria, marca, precio, stock, estado
}) => {
    const query = `
        INSERT INTO productos
            (codigo, nombre, descripcion, categoria, marca, precio, stock, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `;

    const values = [
        codigo, nombre, descripcion ?? null, categoria, marca, precio, stock, estado
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};


const actualizarProducto = async (id, {
    codigo, nombre, descripcion, categoria, marca, precio, stock, estado
}) => {
    const query = `
        UPDATE productos
        SET codigo = $1,
            nombre = $2,
            descripcion = $3,
            categoria = $4,
            marca = $5,
            precio = $6,
            stock = $7,
            estado = $8
        WHERE id = $9
        RETURNING *
    `;

    const values = [
        codigo, nombre, descripcion ?? null, categoria, marca, precio, stock, estado, id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const eliminarProducto = async (id) => {
    const result = await pool.query(
        "DELETE FROM productos WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

export {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};


function InventarioTabla({ productos, onEditar, onEliminar }) {
    if (productos.length === 0) {
        return <p>No hay productos registrados.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.categoria_id}>
                        <td>{producto.codigo}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.categoria}</td>
                        <td>{Number(producto.precio).toFixed(2)}</td>
                        <td>{producto.stock}</td>
                        <td>
                            {producto.estado ? "Activo" : "Inactivo"}
                        </td>
                        <td>
                            <button
                                onClick={() => onEditar(producto.categoria_id)}
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => onEliminar(producto)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InventarioTabla;
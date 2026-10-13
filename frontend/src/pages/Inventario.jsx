
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import InventarioTabla from "../components/InventarioTabla";

function Inventario() {
    const {
        productos,
        listarProductos,
        eliminarProducto
    } = useInventario();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        listarProductos()
            .catch((error) => {
                setError(
                    error.response?.data?.mensaje ||
                    error.message
                );
            })
            .finally(() => setCargando(false));
    }, []);

    const manejarEliminar = async (producto) => {
        const confirmar = window.confirm(
            `¿Quieres eliminar ${producto.nombre}?`
        );

        if (!confirmar) return;

        setError("");
        setMensaje("");

        try {
            await eliminarProducto(producto.categoria_id);
            setMensaje("Producto eliminado correctamente");
        } catch (error) {
            setError(
                error.response?.data?.mensaje ||
                error.message
            );
        }
    };

    return (
        <main>
            <h1>Sistema de inventario</h1>

            <Link to="/crear">Registrar producto</Link>

            {mensaje && <p>{mensaje}</p>}
            {error && <p role="alert">{error}</p>}

            {cargando ? (
                <p>Cargando productos...</p>
            ) : (
                <InventarioTabla
                    productos={productos}
                    onEditar={(id) => navigate(`/editar/${id}`)}
                    onEliminar={manejarEliminar}
                />
            )}
        </main>
    );
}

export default Inventario;
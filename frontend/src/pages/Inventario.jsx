import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useInventario } from "../context/inventarioContext";
import { obtenerErrores } from "../errors/obtenerErrores";
import { InventarioTabla } from "../componentes/InventarioTobla";


function Inventario() {
    const { productos, listarProductos, eliminarProducto } = useInventario();

    const location = useLocation();
    const navigate = useNavigate();

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [productoEliminar, setProductoEliminar] = useState(null);
    const [mensaje, setMensaje] = useState(location.state?.mensaje ?? "");

    useEffect(() => {
        listarProductos()
            .catch((e) => setError(obtenerErrores(e).join(". ")))
            .finally(() => setCargando(false));
    }, []);

    const manejarEliminar = async () => {
        setError("");
        setMensaje("");

        try {
            await eliminarProducto(productoEliminar.id);
            setMensaje("Producto eliminado correctamente");
            setProductoEliminar(null);
        } catch (e) {
            setError(obtenerErrores(e).join(". "));
            setProductoEliminar(null);
        }
    };

    return (
        <main>
            <h1>Sistema de inventario</h1>

            <Link to="/crear">Nuevo producto</Link>

            {mensaje && <p role="status">{mensaje}</p>}
            {error && <p role="alert">{error}</p>}

            {cargando ? (
                <p>Cargando productos...</p>
            ) : (
                <InventarioTabla
                    productos={productos}
                    onEditar={(id) => navigate(`/editar/${id}`)}
                    onEliminar={(producto) => setProductoEliminar(producto)}
                />
            )}
            {productoEliminar && (
                <div className="confirmacion-fondo">
                    <div className="confirmacion-caja">
                        <h2>¿Eliminar producto?</h2>

                        <p>
                            ¿Quieres eliminar <strong>{productoEliminar.nombre}</strong>?
                        </p>

                        <div className="confirmacion-botones">
                            <button
                                className="boton-cancelar"
                                onClick={() => setProductoEliminar(null)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="boton-eliminar"
                                onClick={manejarEliminar}
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Inventario;

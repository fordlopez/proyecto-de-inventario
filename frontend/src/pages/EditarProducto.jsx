
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import ProductoFormulario from "../components/ProductoFormulario";

function EditarProducto() {
    const { id } = useParams();

    const {
        obtenerProducto,
        actualizarProducto
    } = useInventario();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        obtenerProducto(id)
            .then(setProducto)
            .catch((error) => {
                setError(
                    error.response?.data?.mensaje ||
                    error.message
                );
            })
            .finally(() => setCargando(false));
    }, [id]);

    const manejarGuardar = async (datos) => {
        await actualizarProducto(id, datos);
        navigate("/");
    };

    if (cargando) {
        return <p>Cargando producto...</p>;
    }

    if (error) {
        return (
            <main>
                <p role="alert">{error}</p>
                <Link to="/">Volver al inventario</Link>
            </main>
        );
    }

    if (!producto) {
        return <p>No se encontró el producto.</p>;
    }

    return (
        <main>
            <Link to="/">Volver al inventario</Link>

            <ProductoFormulario
                producto={producto}
                onGuardar={manejarGuardar}
            />
        </main>
    );
}

export default EditarProducto;
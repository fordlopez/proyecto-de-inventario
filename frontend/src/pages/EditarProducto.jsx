import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ProductoFormulario } from "../componentes/ProductoFormulario";
import { useInventario } from "../context/inventarioContext";
import { obtenerErrores } from "../errors/obtenerErrores";

function EditarProducto() {
    const { id } = useParams();
    const { obtenerProducto, actualizarProducto } = useInventario();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setCargando(true);
        setError("");

        obtenerProducto(id)
            .then(setProducto)
            .catch((e) => setError(obtenerErrores(e).join(". ")))
            .finally(() => setCargando(false));
    }, [id]);

    const manejarGuardar = async (datos) => {
        await actualizarProducto(id, datos);
        navigate("/", { state: { mensaje: "Producto actualizado correctamente" } });
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
        return (
            <main>
                <p>No se encontró el producto.</p>
                <Link to="/">Volver al inventario</Link>
            </main>
        );
    }

    return (
        <main>
            <Link to="/">Volver al inventario</Link>

            <ProductoFormulario producto={producto} onGuardar={manejarGuardar} />
        </main>
    );
}

export default EditarProducto;

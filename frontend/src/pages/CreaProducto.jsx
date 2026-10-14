import { Link, useNavigate } from "react-router";
import { ProductoFormulario } from "../componentes/ProductoFormulario";
import { useInventario } from "../context/inventarioContext";

function CrearProducto() {
    const { crearProducto } = useInventario();
    const navigate = useNavigate();

    const manejarGuardar = async (datos) => {
        await crearProducto(datos);
        navigate("/", { state: { mensaje: "Producto creado correctamente" } });
    };

    return (
        <main>
            <Link to="/">Volver al inventario</Link>

            <ProductoFormulario onGuardar={manejarGuardar} />
        </main>
    );
}

export { CrearProducto };

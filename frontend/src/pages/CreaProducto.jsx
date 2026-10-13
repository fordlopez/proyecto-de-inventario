
import { Link, useNavigate } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import ProductoFormulario from "../components/ProductoFormulario";

function CrearProducto() {
    const { crearProducto } = useInventario();
    const navigate = useNavigate();

    const manejarGuardar = async (datos) => {
        await crearProducto(datos);
        navigate("/");
    };

    return (
        <main>
            <Link to="/">Volver al inventario</Link>

            <ProductoFormulario
                onGuardar={manejarGuardar}
            />
        </main>
    );
}

export default CrearProducto;
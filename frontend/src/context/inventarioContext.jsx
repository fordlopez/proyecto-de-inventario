import { createContext, useContext, useState } from "react";
import inventarioApi from "../api";

const InventarioContext = createContext(null);

function InventarioProvider({ children }) {
    const [productos, setProductos] = useState([]);

    const listarProductos = async () => {
        const respuesta = await inventarioApi.get("/");
        const datos = respuesta.data?.data ?? respuesta.data;

        setProductos(Array.isArray(datos) ? datos : []);
    };

    const obtenerProducto = async (id) => {
        const respuesta = await inventarioApi.get(`/${id}`);
        const producto = respuesta.data?.data ?? respuesta.data;

        if (!producto) {
            throw new Error(`No existe un producto con el ID ${id}`);
        }

        return producto;
    };

    const crearProducto = async (datos) => {
        await inventarioApi.post("/", datos);
        await listarProductos();
    };

    const actualizarProducto = async (id, datos) => {
        await inventarioApi.put(`/${id}`, datos);
        await listarProductos();
    };

    const eliminarProducto = async (id) => {
        await inventarioApi.delete(`/${id}`);

        // Actualiza la lista sin recargar la página
        setProductos((anteriores) =>
            anteriores.filter((producto) => producto.id !== Number(id))
        );
    };

    return (
        <InventarioContext.Provider
            value={{
                productos,
                listarProductos,
                obtenerProducto,
                crearProducto,
                actualizarProducto,
                eliminarProducto
            }}
        >
            {children}
        </InventarioContext.Provider>
    );
}

const useInventario = () => {
    const contexto = useContext(InventarioContext);

    if (!contexto) {
        throw new Error("useInventario debe usarse dentro de InventarioProvider");
    }

    return contexto;
};

export { InventarioProvider, InventarioContext, useInventario };

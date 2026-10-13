
import { createContext, useContext, useState } from "react";
import inventarioApi from "../api";
inventarioApi

const InventarioContext = createContext();

export function InventarioProvider({ children }) {
    const [productos, setProductos] = useState([]);

    const listarProductos = async () => {
        const respuesta = await inventarioApi.get("/");
        const datos = respuesta.data?.data ?? respuesta.data;

        setProductos(Array.isArray(datos) ? datos : []);
    };

    const obtenerProducto = async (id) => {
        const respuesta = await inventarioApi.get(`/${id}`);
        const datos = respuesta.data?.data ?? respuesta.data;

        const producto = Array.isArray(datos) ? datos[0] : datos;

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

        setProductos((anteriores) =>
            anteriores.filter(
                (producto) => producto.categoria_id !== Number(id)
            )
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

export function useInventario() {
    return useContext(InventarioContext);
}
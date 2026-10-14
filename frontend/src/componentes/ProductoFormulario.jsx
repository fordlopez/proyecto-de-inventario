import { useEffect, useState } from "react";
import { obtenerErrores } from "../errors/obtenerErrores";

const formularioInicial = {
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precio: "",
    stock: "0",
    estado: true
};

function ProductoFormulario({ producto, onGuardar }) {
    const [formulario, setFormulario] = useState(formularioInicial);
    const [guardando, setGuardando] = useState(false);
    const [errores, setErrores] = useState([]);

    useEffect(() => {
        if (producto) {
            setFormulario({
                codigo: producto.codigo ?? "",
                nombre: producto.nombre ?? "",
                descripcion: producto.descripcion ?? "",
                categoria: producto.categoria ?? "",
                marca: producto.marca ?? "",
                precio: String(producto.precio ?? ""),
                stock: String(producto.stock ?? 0),
                estado: producto.estado ?? true
            });
        } else {
            setFormulario(formularioInicial);
        }
    }, [producto]);

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrores([]);

        try {
            await onGuardar({
                codigo: formulario.codigo.trim(),
                nombre: formulario.nombre.trim(),
                descripcion: formulario.descripcion,
                categoria: formulario.categoria.trim(),
                marca: formulario.marca.trim(),
                precio: Number(formulario.precio),
                stock: Number(formulario.stock),
                estado: Boolean(formulario.estado)
            });
        } catch (error) {
            setErrores(obtenerErrores(error));
            setGuardando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>{producto ? "Editar producto" : "Nuevo producto"}</h2>

            <label>
                Código
                <input
                    name="codigo"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    maxLength={20}
                    required
                />
            </label>

            <label>
                Nombre
                <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    maxLength={100}
                    required
                />
            </label>

            <label>
                Descripción
                <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                />
            </label>

            <label>
                Categoría
                <input
                    name="categoria"
                    value={formulario.categoria}
                    onChange={manejarCambio}
                    maxLength={50}
                    required
                />
            </label>

            <label>
                Marca
                <input
                    name="marca"
                    value={formulario.marca}
                    onChange={manejarCambio}
                    maxLength={50}
                    required
                />
            </label>

            <label>
                Precio
                <input
                    name="precio"
                    type="number"
                    min="0.01"
                    max="99999999.99"
                    step="0.01"
                    value={formulario.precio}
                    onChange={manejarCambio}
                    required
                />
            </label>

            <label>
                Stock
                <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={formulario.stock}
                    onChange={manejarCambio}
                    required
                />
            </label>

            <label>
                <input
                    name="estado"
                    type="checkbox"
                    checked={formulario.estado}
                    onChange={manejarCambio}
                />
                Producto activo
            </label>

            {errores.length > 0 && (
                <ul role="alert">
                    {errores.map((mensaje, indice) => (
                        <li key={indice}>{mensaje}</li>
                    ))}
                </ul>
            )}

            <button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar"}
            </button>
        </form>
    );
}

export { ProductoFormulario };

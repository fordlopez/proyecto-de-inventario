
import { z } from "zod";

const codigoSchema = z.string()
    .trim()
    .min(1, "El código es obligatorio")
    .max(20, "El código no puede superar 20 caracteres");

const nombreSchema = z.string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres");

const textoObligatorio50 = (campo) =>
    z.string()
        .trim()
        .min(1, `${campo} es obligatorio`)
        .max(50, `${campo} no puede superar 50 caracteres`);

const precioSchema = z.number()
    .positive("El precio debe ser mayor que cero")
    .max(99999999.99, "El precio supera el límite de NUMERIC(10,2)")
    .refine(
        (valor) => Math.abs(valor * 100 - Math.round(valor * 100)) < 0.000001,
        "El precio admite como máximo dos decimales"
    );

const stockSchema = z.number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .max(2147483647, "El stock supera el límite permitido");

const camposEditables = {
    codigo: codigoSchema,
    nombre: nombreSchema,
    descripcion: z.string().optional(),
    categoria: textoObligatorio50("La categoría"),
    marca: textoObligatorio50("La marca"),
    precio: precioSchema,
    stock: stockSchema
};

const crearProductoSchema = z.object({
    ...camposEditables,
    estado: z.boolean().default(true)
}).strict();

const actualizarProductoSchema = z.object({
    ...camposEditables,
    estado: z.boolean()
}).strict();

const idParamsSchema = z.object({
    id: z.string()
        .regex(/^[1-9]\d*$/, "El ID debe ser un entero positivo")
        .refine(
            (v) => Number(v) <= 2147483647,
            "El ID está fuera del rango permitido"
        )
});

export {
    crearProductoSchema,
    actualizarProductoSchema,
    idParamsSchema
};
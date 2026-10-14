// Convierte cualquier error de axios en una lista de textos legibles
const obtenerErrores = (error) => {
    // No hubo respuesta: el backend está apagado o inalcanzable
    if (error.request && !error.response) {
        return ["No se pudo conectar con el servidor. Verifica que la API esté encendida."];
    }

    const { mensaje, errores } = error.response?.data ?? {};

    // Errores de validación de Zod: [{ campo, mensaje }]
    if (Array.isArray(errores) && errores.length > 0) {
        return errores.map((e) => `${e.campo}: ${e.mensaje}`);
    }

    return [mensaje || error.message || "Ocurrió un error inesperado"];
};

export { obtenerErrores };

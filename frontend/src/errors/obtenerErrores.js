
const obtenerErrores = (error) => {

    if (error.request && !error.response) {
        return ["No se pudo conectar con el servidor. Verifica que la API esté encendida."];
    }

    const { mensaje, errores } = error.response?.data ?? {};

    if (Array.isArray(errores) && errores.length > 0) {
        return errores.map((e) => `${e.campo}: ${e.mensaje}`);
    }

    return [mensaje || error.message || "Ocurrió un error inesperado"];
};

export { obtenerErrores };

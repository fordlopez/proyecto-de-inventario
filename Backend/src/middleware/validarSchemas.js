
const validarSchema = (schema, origen = "body") => {
    return (req, res, next) => {
        const resultado = schema.safeParse(req[origen]);

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: "Error de validación",
                errores: resultado.error.issues.map((error) => ({
                    campo: error.path.join("."),
                    mensaje: error.message
                }))
            });
        }

        req[origen] = resultado.data;
        next();
    };
};

export { validarSchema };
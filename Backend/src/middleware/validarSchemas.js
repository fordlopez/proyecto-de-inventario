const validarSchema = (schema, origen = "body") => {
    return (req, res, next) => {
        const resultado = schema.safeParse(req[origen]);

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: "Error de validación",
                errores: resultado.error.issues.map((issue) => ({
                    campo: issue.path.join("."),
                    mensaje: issue.message
                }))
            });
        }


        if (origen === "body") {
            req.body = resultado.data;
        } else {
            Object.defineProperty(req, origen, {
                value: resultado.data,
                writable: true,
                configurable: true,
                enumerable: true
            });
        }

        next();
    };
};

export { validarSchema };

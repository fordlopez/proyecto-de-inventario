const rutaNoEncontrada = (req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
};


const errorHandler = (error, req, res, next) => {
    console.error("Error interno del servidor:", error);

    if (res.headersSent) {
        return next(error);
    }
    if (error.code == "23505") {
        return res.status(409).json({
            mensaje: "Ya existe un producto con ese código"
        });
    }

    if (error.type == "entity.parse.failed") {
        return res.status(400).json({ mensaje: "El JSON enviado no es válido" });
    }

    return res.status(500).json({
        mensaje: "Error interno del servidor admin Chambeando "
    });
};

export { errorHandler, rutaNoEncontrada };

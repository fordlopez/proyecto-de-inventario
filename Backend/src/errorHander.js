
const errorHandler = (error, req, res, next) => {
    console.error("Error interno del servidor:", error);

    if (res.headersSent) {
        return next(error);
    }

    return res.status(500).json({
        mensaje: "Error interno del servidor admin Chambeando "
    });
};

export { errorHandler };

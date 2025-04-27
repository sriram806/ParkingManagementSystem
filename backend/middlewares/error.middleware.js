const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;
        console.error(err);

        // Handle CastError (invalid ObjectId)
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Handle Duplicate Key Error (11000)
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);  // Corrected this line
            error.statusCode = 400;
        }

        // Handle ValidationError (Mongoose validation errors)
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        // Return error response
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;

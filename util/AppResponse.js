const handler = (req, res, next) => {
    res.responseError = (code , error) => {
        const err = {
            statusCode: 400,
            success: false,
            error: error,
            code: code
        };
        res.status(400).json(err);
    };
    res.responseFailAuth = (code, error) => {
        const err = {
            statusCode: 401,
            success: false,
            error: error,
            code: code
        };
        res.status(401).json(err);
    };
    res.responseSuccess = (data) => res.status(200).json(data);
    next();
};

module.exports = handler;
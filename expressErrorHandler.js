import { HttpError } from './HttpError.js';

export function expressErrorHandler(error, req, res, next) {

    let r = {
        code: 500,
        message: error.message,
    }

    if (process.env.NODE_ENV == "development")
    {
        r.stack =  error.stack;
    }

    if (error instanceof HttpError)
    {
        r.code = error.code;
    }

    if (r.code == 500)
    {
        console.error(r.message);
        console.error(r.stack);
    }

    res.status(r.code).json(r);
};


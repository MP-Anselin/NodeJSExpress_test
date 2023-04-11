export const BAD_REQUEST : {code: number, message: string} = {code: 400, message: "Bad Request"};
export const UNAUTHORIZED : {code: number, message: string} = {code: 401, message: "Unauthorized"};
export const FORBIDDEN : {code: number, message: string} = {code: 403, message: "Forbidden"};
export const NOT_FOUND : {code: number, message: string} = {code: 404, message: "Not Found"};
export const METHOD_NOT_ALLOWED : {code: number, message: string} = {code: 405, message: "Method Not Allowed"};
export const CONFLICT : {code: number, message: string} = {code: 409, message: "Conflict"};
export const INTERNAL_SERVER_ERROR : {code: number, message: string} = {code: 500, message: "Internal Server Error"};

export const httpMacroResponse = [
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
]

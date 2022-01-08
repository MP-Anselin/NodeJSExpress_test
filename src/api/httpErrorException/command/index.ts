import HttpErrorException from "../httpErrorException";
import ExceptionReturn from "../exceptionReturn";

class CommandErrorException extends HttpErrorException{
    constructor(code_s: string, message?: string) {
        const code = parseInt(code_s)
        if (message)
            super(code, message);
        else
            super(code, <string>ExceptionReturn(code))
    }
}

export default CommandErrorException

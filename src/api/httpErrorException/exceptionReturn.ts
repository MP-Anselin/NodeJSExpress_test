import {httpMacroResponse, INTERNAL_SERVER_ERROR} from "../utils/macro.globals";

const ExceptionReturn = (code: number): string => {
    const status = httpMacroResponse.find((el) => code == el.code)
    if (status)
        return status.message;
    else
        return INTERNAL_SERVER_ERROR.message;
}
export default ExceptionReturn;

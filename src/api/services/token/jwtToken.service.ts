import * as jwt from 'jsonwebtoken';
import {DataStoredTokenInterface, TokenDataInterface} from "../../tables/authentification/interfaces";

export function jwtToken(_id: string): TokenDataInterface {
    const expiresIn = 60 * 60;
    const secret = <string>process.env.JWT_SECRET;
    const payload: DataStoredTokenInterface = {
        _id: _id,
    };
    return {
        expiresIn,
        token: jwt.sign(payload, secret, { expiresIn }),
    };
}

export default jwtToken

import { Request } from 'express';
import {UserInterface} from './user.interface';

interface RequestUserInterface extends Request {
    user: UserInterface;
}

export default RequestUserInterface;
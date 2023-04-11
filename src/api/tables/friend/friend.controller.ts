import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {FriendService} from "./friend.service";
import {CreateFriendDto, UpdateFriendDto} from "./dto"
import {AuthenticationMiddleware} from "../../middleware";
import ValidationUserMiddleware from "../../middleware/validateUser.middleware";
import RequestUserInterface from "../user/interfaces/requestUser.interface";
import {ObjectId} from "mongodb";

export class FriendController extends Controller {

    constructor(private readonly friendService: FriendService = new FriendService()) {
        super('/friend')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.all(`${this.path}/*`, AuthenticationMiddleware)
            .get(`${this.path}s`, AuthenticationMiddleware, this.getUserAllFriend)
            .get(`${this.path}/:id`, this.getFriendById)
            .post(`${this.path}/add`, AuthenticationMiddleware, ValidationUserMiddleware(CreateFriendDto, true), this.addFriend)
            .patch(`${this.path}`, AuthenticationMiddleware, ValidationUserMiddleware(UpdateFriendDto, true), this.updateFriend)
            .delete(`${this.path}/remove/:id`, AuthenticationMiddleware, this.deleteFriend)
    }

    private getUserAllFriend = async (request: RequestUserInterface, response: Response) => {
        const userId = request.user?._id
        if (userId) {
            const result = await this.friendService.findUserAllFriend(userId);
            response.send(result);
        }
    }

    private getFriendById = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.friendService.findOne({_id: request.params.id}, next_f)
        if (result)
            response.send(result)
    }

    private addFriend = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const friendData: CreateFriendDto = request.body;
        friendData.user_id = new ObjectId(request.user?._id);
        friendData.friend_id = new ObjectId(friendData.friend_id);
        const result = await this.friendService.add(friendData, next_f)
        if (result)
            response.send(result)
    }

    private updateFriend = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const friendData: UpdateFriendDto = request.body;
        let userId =  request.user?._id;
        if (!userId)
            userId = "";
        const result = await this.friendService.update(userId, friendData, next_f)
        if (result)
            response.send(result)
    }

    private deleteFriend = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.friendService.delete(request.params.id, next_f)
        if (result)
            response.send(result)
    }
}

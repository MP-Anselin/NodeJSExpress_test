import FriendModel from "./model/friend.model";
import {logger} from "../../logger";
import {NextFunction} from "express";
import {INTERNAL_SERVER_ERROR, NOT_FOUND} from "../../utils/macro.globals";
import {HttpErrorException} from "../../httpErrorException";
import CreateFriendDto from "./dto/createFriend.dto";
import UpdateFriendDto from "./dto/updateFriend.dto";

export class FriendService {
    private friendModel = FriendModel;

    async add(newFriendData: CreateFriendDto, next_f: NextFunction) {
        const createdFriend = new this.friendModel({
            ...newFriendData,
        });
        const response = await createdFriend.save();
        if (response) {
            logger.info("Route: Friend => create new Friends");
            return (response)
        } else {
            logger.error("Route: Friend => [error] create new Friends");
            next_f(new HttpErrorException(INTERNAL_SERVER_ERROR))
        }
    }

    async findUserAllFriend(userId: string) {
        logger.info("Route: Friend => findAll friend");
        return this.sortUserCardBy({user_id: userId});
    }

    async sortUserCardBy(filter: {}) {
        logger.info("Route: Friend => findAll friend");
        return this.friendModel.find(filter);
    }

    async findOne(filter: {}, next_f: NextFunction) {
        const response = await this.friendModel.findOne(filter)
        if (response) {
            logger.info("Route: findOne a friend");
            return (response)
        } else {
            logger.error("Route: Friend => [error] findOne a friend");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find product with element ${filter}`))
        }
    }

    async update(_id: string, updateFriendDto: UpdateFriendDto, next_f: NextFunction) {
        const response = await this.friendModel.findOneAndUpdate({_id}, updateFriendDto, {useFindAndModify: false})
        if (response) {
            logger.info("Route: Friend => update a friend");
            return (response)
        } else {
            logger.error("Route: Friend => [error] update a friend");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find friend with _id ${_id}`))
        }
    }

    async delete(_id: string, next_f: NextFunction) {
        const response = await this.friendModel.findByIdAndDelete(_id)
        if (response) {
            logger.info("Route: Friend => delete a friend");
            return (response)
        } else {
            logger.error("Route: Friend => [error] delete a friend");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find friend with _id ${_id}`))
        }
    }
}

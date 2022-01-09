import UserModel from "./model/user.model";
import {logger} from "../../logger";
import {CreateUserDto, UpdateUserDto} from "./dto";
import {ProductErrorException, UserErrorException} from "../../httpErrorException";
import {NextFunction} from "express";
import {isUserExistAggregate} from "../authentification/aggregate";

export class UserService {
    private userModel = UserModel

    async create(newUserData: CreateUserDto, next_f: NextFunction) {
        const alreadyUser = await this.checkUserAlreadyExist(newUserData);
        if (alreadyUser) {
            next_f(new UserErrorException(<string>process.env.CONFLICT_CODE))
            return
        }
        const createUser = new this.userModel(newUserData)
        const date = new Date()

        createUser.createAt = date
        createUser.updateAt = date
        createUser.isLog = false
        const response = await createUser.save();
        if (response) {
            logger.info("Route: User => create new user");
            return response
        }
        logger.info("Route: User => [error] create new user");
        next_f(new UserErrorException(<string>process.env.CONFLICT_CODE))
    }

    async checkUserAlreadyExist(userData: CreateUserDto) {
        const {email} = userData
        return this.userModel.aggregate(isUserExistAggregate(email));
    }

    async findAll() {
        logger.info("Route: User => findAll product");
        return this.userModel.find();
    }

    async findOne(filter: {}, next_f: NextFunction) {
        const response = await this.userModel.findOne(filter)
        if (response) {
            logger.info("Route: User => findOne a user");
            return (response)
        } else {
            logger.error("Route: User => [error] findOne a user");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find user with element ${filter}`))
        }
    }


    async updateInfo(updateData: UpdateUserDto, userFilterQuery: {}, next_f: NextFunction) {
        updateData.updateAt = new Date()
        const response = await this.userModel.findOneAndUpdate(userFilterQuery, updateData, {useFindAndModify: false})
        if (response) {
            logger.info("Route: User => update user data");
            return response
        }
        logger.error("Route: User => [error] update user data");
        next_f(new UserErrorException(<string>process.env.BAD_REQUEST_CODE))

    }

    async logOut(_id: string, next_f: NextFunction) {
        const user: UpdateUserDto = new UpdateUserDto()
        user.isLog = false
        const response = await this.updateInfo(user, {_id: _id}, next_f)
        if (response) {
            logger.info("Route: User => log out user");
            return (response)
        }
        logger.error("Route: User => [error] log out user");
    }

}
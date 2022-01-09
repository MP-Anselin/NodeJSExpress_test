import UserModel from "./model/user.model";
import {logger} from "../../logger";
import {CreateUserDto, UpdateUserDto} from "./dto";
import {ProductErrorException, UserErrorException} from "../../httpErrorException";
import {NextFunction} from "express";
import {isUserExistAggregate} from "../authentification/aggregate";
import {CommandService} from "../command/command.service";
import {ProductService} from "../product/product.service";

export class UserService {
    private userModel = UserModel
    private commandService = new CommandService()
    private productService = new ProductService()

    async create(newUserData: CreateUserDto, next_f: NextFunction) {
        const alreadyUser = await this.checkUserAlreadyExist(newUserData);
        if (alreadyUser.length !== 0) {
	    logger.error("Route: User => [error] create new user conflict of user ");
            next_f(new UserErrorException(<string>process.env.CONFLICT_CODE))
            return
        }
        const createUser = new this.userModel(newUserData)
        const date = new Date()

        createUser.createAt = date
        createUser.updateAt = date
        createUser.isLog = true
        const response = await createUser.save();
        if (response) {
            logger.info("Route: User => create new user");
            return response
        }
        logger.error("Route: User => [error] create new user");
        next_f(new UserErrorException(<string>process.env.CONFLICT_CODE))
    }

    async checkUserAlreadyExist(userData: CreateUserDto) {
        const {email} = userData
        return this.userModel.aggregate(isUserExistAggregate(email));
    }

    async findAll() {
        logger.info("Route: User => find All user");
        return this.userModel.find();
    }

    async findAllCommands(_id: string, next_f: NextFunction) {
        if (!_id) {
            logger.info("Route: User => [error] find user commands");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find user commands with id ${_id}`))
            return
        }
        const cmdSort = {user_id: _id}
        const response = this.commandService.sortCommandBy(cmdSort);
        if (!response) {
            logger.info("Route: User => [error] find user commands");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find user commands with id ${_id}`))
            return
        }
        logger.info("Route: User => find user commands");
        return response;
    }

    async findAllProducts(_id: string, next_f: NextFunction) {
        if (!_id) {
            logger.info("Route: User => [error] find user commands");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find user commands with id ${_id}`))
            return
        }
        const cmdSort = {user_id: _id}
        const response = this.productService.sortProductBy(cmdSort);
        if (!response) {
            logger.error("Route: User => [error] find user products");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find user commands with id ${_id}`))
            return
        }
        logger.info("Route: User => find user products");
        return response;
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
            logger.info("Route: User => update user info");
            return response
        }
        logger.error("Route: User => [error] update user info");
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
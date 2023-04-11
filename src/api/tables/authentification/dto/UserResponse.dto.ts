class UserResponse {
    public _id!: string;
    public firstName!: string;
    public lastName!: string;
    public username!: string;
    public email!: string;
    public image!: string;
    public userRole!: string;
    public isLog: boolean = false;
    public createAt!: Date;
    public updateAt!: Date;
    public status!: Number;
    public age!: Number;

    constructor(userData: any) {
        this._id = userData._id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.username = userData.username;
        this.age = userData.age;
        this.image = userData.image;
        this.userRole = userData.userRole;
        this.email = userData.email;
        this.isLog = userData.isLog;
        this.status = userData.status;
        this.createAt = userData.createAt;
        this.updateAt = userData.updateAt;
    }
}

export default UserResponse;

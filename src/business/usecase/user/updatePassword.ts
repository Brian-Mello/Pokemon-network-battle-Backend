import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class UpdatePasswordUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway
    ){}

    public async execute(input: UpdatePasswordUCInput): Promise<UpdatePasswordUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found!");
        };

        const user = await this.userGateway.getUserById(userInfo.id);

        if(!user){
            throw new Error("User not found!");
        }

        if(!input.oldPassword){
            throw new Error("You need to send the old password input!")
        }

        if(!input.newPassword) {
            throw new Error("You need to send the new password input!")
        }

        if(input.oldPassword === input.newPassword){
            throw new Error("you cannot use your last password!")
        }

        const oldPasswordCompare = await this.cryptographyGateway.compare(input.oldPassword, user.getPassword());

        if(!oldPasswordCompare){
            throw new Error("Old Password is wrong!");
        };

        const newPassword = await this.cryptographyGateway.encrypt(input.newPassword)

        await this.userGateway.updatePassword(userInfo.id, newPassword)

        return {
            message: "Password updated successfully!"
        }
    }
}

export interface UpdatePasswordUCInput {
    token: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePasswordUCOutput {
    message: string;
}
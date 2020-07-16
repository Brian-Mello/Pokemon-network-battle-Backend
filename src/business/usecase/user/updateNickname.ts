import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UpdateNicknameUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: UpdateNicknameUCInput): Promise<UpdateNicknameUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found!");
        };

        const user = await this.userGateway.getUserById(userInfo.id);

        if(!user){
            throw new Error("User not found!");
        }

        if(!input.nickname){
            throw new Error("You must inform the new nickname!")
        }

        const existingNickname = await this.userGateway.getUserByNickname(input.nickname)

        if(existingNickname){
            throw new Error("Nickname already exist!")
        }

        await this.userGateway.updateNickname(userInfo.id, input.nickname)

        return {
            message: "Nickname updated successfully!"
        }
    }
}

export interface UpdateNicknameUCInput {
    token: string;
    nickname: string;
}

export interface UpdateNicknameUCOutput {
    message: string;
}
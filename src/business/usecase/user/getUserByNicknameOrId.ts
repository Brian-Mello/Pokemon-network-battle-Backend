import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { GetUserDataUCInput } from "./getUserData";
import { User } from "../../entites/user";

export class GetUserByNicknameOrIdUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: GetUserByNicknameOrIdUCInput): Promise<GetUserByNicknameOrIdUCOutput> {

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found!");
        };

        let user = await this.userGateway.getUserByNicknameOrId(input.nicknameOrId)

        if(!user){
            throw new Error("User not found!");
        };


        return {
            User: {
                id: user.getId(),
                name: user.getName(),
                nickname: user.getNickname(),
                gender: user.getGender(),
                photo: user.getPhoto(),
                email: user.getEmail()
            }
        }
    }
}   

export interface GetUserByNicknameOrIdUCInput {
    token: string;
    nicknameOrId: string;
}

export interface GetUserByNicknameOrIdUCOutput {
    User: GetUserByNicknameOrIdUCOutputUser
}

export interface GetUserByNicknameOrIdUCOutputUser {
    id: string;
    name: string;
    nickname: string;
    gender: string;
    photo: string;
    email: string;
}
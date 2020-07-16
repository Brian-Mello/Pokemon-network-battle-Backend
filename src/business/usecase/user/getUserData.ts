import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetUserDataUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: GetUserDataUCInput): Promise<GetUserDataUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found!");
        };

        const user = await this.userGateway.getUserById(userInfo.id);

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

export interface GetUserDataUCInput {
    token: string;
}

export interface GetUserDataUCOutput {
    User: GetUserDataUCOutputUser
}

export interface GetUserDataUCOutputUser {
    id: string;
    name: string;
    nickname: string;
    gender: string;
    photo: string;
    email: string;
}
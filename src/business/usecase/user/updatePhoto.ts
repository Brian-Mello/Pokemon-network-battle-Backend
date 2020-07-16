import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UpdatePhotoUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: UpdatePhotoUCInput): Promise<UpdatePhotoUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token);

        if(!userInfo){
            throw new Error("User not found!");
        };

        const user = await this.userGateway.getUserById(userInfo.id);

        if(!user){
            throw new Error("User not found!");
        }

        await this.userGateway.updatePhoto(userInfo.id, input.photo)

        return {
            message: "Photo updated successfully!"
        }
    }
}

export interface UpdatePhotoUCInput {
    token: string;
    photo: string;
}

export interface UpdatePhotoUCOutput {
    message: string;
}
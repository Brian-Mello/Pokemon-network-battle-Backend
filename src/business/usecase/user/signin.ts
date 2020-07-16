import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class SigninUC {
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private refreshTokenGateway: RefreshTokenGateway,
        private cryptographyGateway: CryptographyGateway
    ){}

    public async execute(input: SigninUCInput): Promise<SigninUCOutput>{

        if(!input.emailOrnickname){
            throw new Error("Just send an email or nickname!")
        }

        const user = await this.userGateway.signin(input.emailOrnickname);

        let  emailOrNickname = input.emailOrnickname;

        if(!user){
            throw new Error("User not found!");
        };

        const compare = await this.cryptographyGateway.compare(input.password, user.getPassword());

        if(!compare){
            throw new Error("Invalid password!");
        };

        const accessToken = this.authenticationGateway.generateToken({
            id: user.getId()
        }, process.env.ACCESS_TOKEN_TIME as string);
        
        const refreshToken = this.authenticationGateway.generateToken({
            id: user.getId()
        }, process.env.REFRESH_TOKEN_TIME as string);

        const refreshTokenForUser = await this.refreshTokenGateway.getRefreshToken(
            user.getId()
        );

        if(refreshTokenForUser){
            await this.refreshTokenGateway.deleteRefreshToken(user.getId());
        };

        await this.refreshTokenGateway.createRefreshToken({
            token: refreshToken,
            userId: user.getId()
        });

        return{
            message: `User ${emailOrNickname} logged successfully!`,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}

export interface SigninUCInput {
    emailOrnickname: string;
    password: string;
}

export interface SigninUCOutput {
    message: string;
    accessToken: string;
    refreshToken: string;
}
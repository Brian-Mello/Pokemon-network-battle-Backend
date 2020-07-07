import { UserGateway } from "../../gateways/userGateway";
import { v4 } from "uuid";
import { User } from "../../entites/user";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class SignupUC {
    constructor(
        private userGateway: UserGateway,
        private cryptographyGateway: CryptographyGateway
    ){}    

    public async execute(input: SignupUCInput): Promise<SignupUCOutput>{

        const id = v4()

        const useremail = await this.userGateway.getUserByEmail(input.email)

        const userNickname = await this.userGateway.getUserByNickname(input.nickname)

        if(useremail){
            throw new Error("Duplicate email!")
        }  else if (userNickname){
            throw new Error("this nickname is already being used")
        }

        const hashpassword = await this.cryptographyGateway.encrypt(input.password)

        const newUser = new User(
            id,
            input.name,
            input.nickname,
            input.gender,
            input.photo,
            input.email,
            hashpassword
        )
        await this.userGateway.signup(newUser)

        return{
            message: "Account created successfully"
        }
    }
}

export interface SignupUCInput {
    name: string;
    nickname: string;
    gender: string;
    photo: string;
    email: string;
    password: string;
}

export interface SignupUCOutput {
    message: string;
}
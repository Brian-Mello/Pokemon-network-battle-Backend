import { Response, Request } from "express";
import { SignupUC } from "../../../business/usecase/user/signup";
import { UserDB } from "../../../data/userDatabase";
import { BcryptService } from "../../../services/bcryptServices";

export const signupEndpoint = async ( req: Request, res: Response) => {
    try{

        const signupUC = new SignupUC(new UserDB(), new BcryptService());

        const result = await signupUC.execute({
            name: req.body.name,
            nickname: req.body.nickname,
            gender: req.body.gender,
            photo: req.body.photo,
            email: req.body.email,
            password: req.body.password
        })

        res.status(200).send(result);
    } catch(err) {
        res.status(400).send({
            message: err.message
        });
    };
};
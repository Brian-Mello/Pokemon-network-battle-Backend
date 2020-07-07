import { Request, Response } from "express";
import { SigninUC } from "../../../business/usecase/user/signin";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptServices";
import { RefreshTokenDB } from "../../../data/refreshTokenDataBase";

export const signinEndpoint = async (req: Request, res: Response) => {
    try {

        const signinUc = new SigninUC( new UserDB(), new JwtAuthorizer(), new RefreshTokenDB(), new BcryptService());

        const result = await signinUc.execute({
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}
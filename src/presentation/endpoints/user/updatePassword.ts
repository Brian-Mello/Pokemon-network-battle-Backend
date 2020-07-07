import { Request, Response } from "express";
import { UpdatePasswordUC } from "../../../business/usecase/user/updatePassword";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptServices";

export const updatePasswordEndpoint = async (req: Request, res: Response) => {
    try{
        const updatePasswordUc = new UpdatePasswordUC( new UserDB(), new JwtAuthorizer(), new BcryptService());

        const auth = req.headers.Authorization || req.headers.authorization

        const result = await updatePasswordUc.execute({
            token: auth as string,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword
        })
        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}
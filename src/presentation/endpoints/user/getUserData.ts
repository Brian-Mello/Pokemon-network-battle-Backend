import { Request, Response } from "express";
import { GetUserDataUC } from "../../../business/usecase/user/getUserData";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const getUserDataEndpoint = async (req: Request, res: Response) => {
    try {
        const getUserDateUc = new GetUserDataUC( new UserDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.Authorization;

        const result = await getUserDateUc.execute({
            token: auth as string
        })

        res.status(200).send(result)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
}
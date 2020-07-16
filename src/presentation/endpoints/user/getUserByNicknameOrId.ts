import { Request, Response } from "express";
import { GetUserByNicknameOrIdUC } from "../../../business/usecase/user/getUserByNicknameOrId";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const getUserByNicknameOrIdEndpoint = async (req: Request, res: Response) => {
    try {
        const getUserByNicknameOrIdUc = new GetUserByNicknameOrIdUC( new UserDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.Authorization;

        const result = await getUserByNicknameOrIdUc.execute({
            token: auth as string,
            nicknameOrId: req.query.nicknameOrId as string
        });

        res.status(200).send(result);
    } catch(err) {
        res.status(400).send({
            message: err.message
        });
    };
};
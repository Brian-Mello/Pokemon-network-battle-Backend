import { Request, Response } from "express";
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { UpdateNicknameUC } from "../../../business/usecase/user/updateNickname";

export const updateNicknameEndpoint = async (req: Request, res: Response) => {
    try {

        const updateNicknameUc = new UpdateNicknameUC( new UserDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.authorization;

        const result = await updateNicknameUc.execute({
            token: auth as string,
            nickname: req.body.nickname
        });

        res.status(200).send(result);
    
    } catch(err) {
        res.status(400).send({
            message: err.message
        });
    };
};
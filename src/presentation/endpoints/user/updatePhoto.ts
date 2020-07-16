import { Request, Response } from "express";
import { UpdatePhotoUC } from '../../../business/usecase/user/updatePhoto'
import { UserDB } from "../../../data/userDatabase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const updatePhotoEndpoint = async (req: Request, res: Response) => {
    try {

        const updatePhotoUc = new UpdatePhotoUC( new UserDB(), new JwtAuthorizer());

        const auth = req.headers.authorization || req.headers.authorization;

        const result = await updatePhotoUc.execute({
            token: auth as string,
            photo: req.body.photo
        });

        res.status(200).send(result);
    } catch(err) {
        res.status(400).send({
            message: err.message
        });
    };
};
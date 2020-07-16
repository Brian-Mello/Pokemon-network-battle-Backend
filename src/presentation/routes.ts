import express, { Request, Response } from "express";

import cors from 'cors';
import { signupEndpoint } from "./endpoints/user/signup";
import { signinEndpoint } from "./endpoints/user/signin";
import { updatePasswordEndpoint } from "./endpoints/user/updatePassword";
import { updatePhotoEndpoint } from "./endpoints/user/updatePhoto";
import { updateNicknameEndpoint } from "./endpoints/user/updateNickname";
import { getUserDataEndpoint } from "./endpoints/user/getUserData";
import { getUserByNicknameOrIdEndpoint } from "./endpoints/user/getUserByNicknameOrId";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", signupEndpoint);
app.post("/signin", signinEndpoint);
app.post("/updatePassword", updatePasswordEndpoint);
app.post("/updatePhoto", updatePhotoEndpoint);
app.post("/updateNickname", updateNicknameEndpoint)
app.get("/getUserData", getUserDataEndpoint);
app.get("/getUserByNicknameOrId", getUserByNicknameOrIdEndpoint);

export default app;

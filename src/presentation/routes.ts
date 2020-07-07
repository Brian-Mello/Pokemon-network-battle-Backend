import express, { Request, Response } from "express";

import cors from 'cors';
import { signupEndpoint } from "./endpoints/user/signup";
import { signinEndpoint } from "./endpoints/user/signin";
import { updatePasswordEndpoint } from "./endpoints/user/updatePassword";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", signupEndpoint);
app.post("/signin", signinEndpoint);
app.post("/updatePassword", updatePasswordEndpoint);

export default app;

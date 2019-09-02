import auth from "basic-auth";
import { findByUsernameAndPassword } from "../crud/users";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/environment";
import { Request, Response } from "express-serve-static-core";
import { UserInstance } from "../models/user";

export const login = (req: Request, res: Response) => {
  const credentials = auth(req);
  if (!credentials) {
    res.status(400).end("Bad request.");
  } else {
    findByUsernameAndPassword({
      name: credentials.name,
      password: credentials.pass
    }).then(user => handleLogin(user, res));
  }
};

const handleLogin = (user: UserInstance | null, res: Response) => {
  if (user === null) {
    res.status(401).send("Provided credentials are wrong");
  } else {
    const token = { token: jwt.sign({ user }, jwtSecret) };
    res.status(200).json(token);
  }
};

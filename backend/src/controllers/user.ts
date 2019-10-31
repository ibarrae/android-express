import {
  findAllUsers,
  findById,
  createUser,
  updateUser,
  deleteUser
} from "../crud/users";
import { Response } from "express";
import { Request } from "express-serve-static-core";
import { DbUser } from "../models/user";

export const getAllUsersController = (_: Request, res: Response) => {
  findAllUsers().then(users => res.status(200).json(users));
};

export const getUserController = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Bad request.");
  } else {
    findById(parseInt(id)).then(user => handleGetUser(user, res));
  }
};

const handleGetUser = (user: DbUser | null, res: Response) => {
  if (user === null) {
    res.status(404).end();
  } else {
    res.status(200).json(user);
  }
};

export const createUserController = (req: Request, res: Response) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    res.status(400).send("Bad request.");
  } else {
    createUser(data).then(user =>
      res.status(201).json({
        message: "User created.",
        user
      })
    );
  }
};

export const updateUserController = (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  if (!id) {
    res.status(400).send("Bad request.");
  } else if (!data || Object.keys(data).length === 0) {
    res.status(400).end();
  } else {
    updateUser(parseInt(id), req.body).then(rows =>
      handleAffectedRows(rows[0], res, "User updated.")
    );
  }
};

export const deleteUserController = (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).end();
  } else {
    deleteUser(parseInt(id)).then(rows =>
      handleAffectedRows(rows, res, "User deleted.")
    );
  }
};

const handleAffectedRows = (rows: number, res: Response, message: string) => {
  if (rows === 0) {
    res.status(404).end();
  } else {
    res.status(200).json({ message });
  }
};

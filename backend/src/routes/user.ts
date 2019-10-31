import express from "express";
import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/user";

export const userRoutes = express.Router();

userRoutes
  .route("/users")
  .get((req, res) => {
    getAllUsersController(req, res);
  })
  .post((req, res) => {
    createUserController(req, res);
  });

userRoutes
  .route("/users/:id")
  .get((req, res) => {
    getUserController(req, res);
  })
  .put((req, res) => {
    updateUserController(req, res);
  })
  .delete((req, res) => {
    deleteUserController(req, res);
  });

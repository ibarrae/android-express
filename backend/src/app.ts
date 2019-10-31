import express from "express";
import createError from "http-errors";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import { userRoutes } from "./routes/user";
import { loginRoute } from "./routes/login";
import { jwtSecret } from "./utils/environment";
import {
  ErrorRequestHandler,
  RequestHandlerParams
} from "express-serve-static-core";

const app = express();

app.use(jwt({ secret: jwtSecret }).unless({ path: ["/api/login"] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", loginRoute);
app.use("/api", userRoutes);

const jwtErrorMiddleware: ErrorRequestHandler = (err, _, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err.message);
  } else {
    res.status(404).send("Requested resource was not found.");
  }
};

app.use(jwtErrorMiddleware);

const generalErrorMiddleware: ErrorRequestHandler = (err, _, res_, next) =>
  next(createError(500, err));

app.use(generalErrorMiddleware);

export const server = app.listen(3000);

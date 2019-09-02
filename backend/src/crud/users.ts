import { User, UserAttributes } from "../models/user";
import { Op } from "sequelize";

export const findAllUsers = () => User.findAll({ raw: true });

type UsernameAndPassword = Pick<UserAttributes, "name" | "password">;

export const findByUsernameAndPassword = ({
  name,
  password
}: UsernameAndPassword) =>
  User.findOne({
    where: {
      username: { [Op.eq]: name },
      password: { [Op.eq]: password }
    },
    raw: true,
    attributes: ["id"]
  }).then(user => (user !== null ? user : null));

export const findById = (id: number) =>
  User.findByPk(id, { raw: true }).then(user => (user !== null ? user : null));

export const createUser = (data: UserAttributes) =>
  User.create({ ...data, created_at: Date.now() });

type UpdateUserData = Pick<UserAttributes, "name" | "username">;

export const updateUser = (id: number, data: UpdateUserData) =>
  User.update(
    { updated_at: Date.now(), ...data },
    { where: { id: { [Op.eq]: id } } }
  );

export const deleteUser = (id: number) => User.destroy({ where: { id } });

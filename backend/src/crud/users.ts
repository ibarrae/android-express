import { DbUser, UserAttributes } from "../models/user";
import { Op } from "sequelize";

export const findAllUsers = () => DbUser.findAll({ raw: true });

type UsernameAndPassword = Pick<UserAttributes, "name" | "password">;

export const findByUsernameAndPassword = ({
  name,
  password
}: UsernameAndPassword) =>
  DbUser.findOne({
    where: {
      username: { [Op.eq]: name },
      password: { [Op.eq]: password }
    },
    raw: true,
    attributes: ["id"]
  }).then(user => (user !== null ? user : null));

export const findById = (id: number) =>
  DbUser.findByPk(id, { raw: true }).then(user =>
    user !== null ? user : null
  );

export const createUser = (data: UserAttributes) =>
  DbUser.create({ ...data, created_at: Date.now() });

type UpdateUserData = Pick<UserAttributes, "name" | "username">;

export const updateUser = (id: number, data: UpdateUserData) =>
  DbUser.update(
    { updated_at: Date.now(), ...data },
    { where: { id: { [Op.eq]: id } } }
  );

export const deleteUser = (id: number) => DbUser.destroy({ where: { id } });

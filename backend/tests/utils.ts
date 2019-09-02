import { UserAttributes } from "../src/models/user";

export const mockUserData: UserAttributes = {
  name: "Esteban",
  username: "eibarra",
  password: "eibarra",
  created_at: Date.now(),
  updated_at: 0
};

export const truncateParams = {
  where: {},
  truncate: true
};

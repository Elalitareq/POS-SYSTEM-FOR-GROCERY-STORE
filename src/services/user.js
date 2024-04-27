import userDAL from "../dal/userDAL.js";

const listAllUsers = async () => {
  return await userDAL.getAllUsers();
};

const findUserById = async (id) => {
  return await userDAL.getUserById(id);
};

const createNewUser = async (userData) => {
  return await userDAL.createUser(userData);
};

const modifyUser = async (id, userData) => {
  return await userDAL.updateUser(id, userData);
};

const removeUser = async (id) => {
  return await userDAL.deleteUser(id);
};

export default {
  listAllUsers,
  findUserById,
  createNewUser,
  modifyUser,
  removeUser,
};

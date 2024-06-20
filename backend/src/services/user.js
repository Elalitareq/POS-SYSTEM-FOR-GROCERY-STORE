import userDAL from '../dal/user.js';

const listAllUsers = async () => await userDAL.getAllUsers();

const findUserById = async (id) => await userDAL.getUserById(id);

const findUserByUserName = async (userName) =>
  await userDAL.getUserByUserName(userName);

const createNewUser = async (userData) => await userDAL.createUser(userData);

const modifyUser = async (id, userData) =>
  await userDAL.updateUser(id, userData);

const removeUser = async (id) => await userDAL.deleteUser(id);

const userDal = {
  listAllUsers,
  findUserById,
  findUserByUserName,
  createNewUser,
  modifyUser,
  removeUser,
};

export default userDal;

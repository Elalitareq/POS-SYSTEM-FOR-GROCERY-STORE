import userDAL from '../dal/user.js';

const listAllUsers = async () => {
  return await userDAL.getAllUsers();
};

const findUserById = async id => {
  return await userDAL.getUserById(id);
};

const findUserByEmail = async email => {
  return await userDAL.getUserByEmail(email);
};

const createNewUser = async userData => {
  return await userDAL.createUser(userData);
};

const modifyUser = async (id, userData) => {
  return await userDAL.updateUser(id, userData);
};

const removeUser = async id => {
  return await userDAL.deleteUser(id);
};

const userDal = {
  listAllUsers,
  findUserById,
  findUserByEmail,
  createNewUser,
  modifyUser,
  removeUser,
};

export default userDal;

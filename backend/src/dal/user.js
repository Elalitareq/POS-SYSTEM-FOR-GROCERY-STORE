import prisma from '../utils/prisma.js';

async function getAllUsers() {
  return prisma.user.findMany();
}

async function getUserById(id) {
  const userId = parseInt(id);
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

async function getUserByUserName(userName) {
  return prisma.user.findUnique({
    where: { userName },
  });
}

async function createUser(data) {
  return prisma.user.create({
    data,
  });
}

async function updateUser(id, newData) {
  const userId = parseInt(id);
  return prisma.user.update({
    where: { id: userId },
    data: newData,
  });
}

async function deleteUser(id) {
  const userId = parseInt(id);
  return prisma.user.delete({
    where: { id: userId },
  });
}

const userDAL = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName,
};

export default userDAL;

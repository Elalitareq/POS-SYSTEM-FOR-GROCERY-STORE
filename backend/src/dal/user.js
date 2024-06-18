import prisma from '../utils/prisma.js';

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(id) {
  const userId = parseInt(id);
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

async function createUser(data) {
  return await prisma.user.create({
    data,
  });
}

async function updateUser(id, newData) {
  const userId = parseInt(id);
  return await prisma.user.update({
    where: { id: userId },
    data: newData,
  });
}

async function deleteUser(id) {
  const userId = parseInt(id);
  return await prisma.user.delete({
    where: { id: userId },
  });
}

const userDAL = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};

export default userDAL;

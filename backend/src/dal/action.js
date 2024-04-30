import prisma from "../utils/prisma";

async function getAllActions() {
  return await prisma.action.findMany();
}

async function getActionById(id) {
  return await prisma.action.findUnique({
    where: { id },
  });
}

async function createAction(data) {
  return await prisma.action.create({
    data,
  });
}

async function updateAction(id, data) {
  return await prisma.action.update({
    where: { id },
    data,
  });
}

async function deleteAction(id) {
  return await prisma.action.delete({
    where: { id },
  });
}

const actionDAL = {
  getAllActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
};

export default actionDAL;

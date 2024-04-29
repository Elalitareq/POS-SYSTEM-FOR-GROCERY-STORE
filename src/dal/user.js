import prisma from "../utils/prisma.js";

async function getAllUsers() {
    return await prisma.user.findMany();
}

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id },
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

async function updateUser(id, data) {
    return await prisma.user.update({
        where: { id },
        data,
    });
}

async function deleteUser(id) {
    return await prisma.user.delete({
        where: { id },
    });
}

const userDAL = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};

export default userDAL;

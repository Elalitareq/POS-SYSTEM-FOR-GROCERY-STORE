import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../services/user.js";
import { makeError } from "../utils/functions.js";
import actionService from "../services/action.js";
import { getUserLogin } from "../utils/user.js";
async function addUser(req, res) {
    const { userName, password, role, password2 } = req.body;

    if (!userName || !password || !role) {
        throw makeError("Please provide userName, password and role", 400);
    }
    if (password !== password2) {
        throw makeError("Passwords do not match", 400);
    }

    const userWithHashPassword = {
        userName,
        role,
        password: await bcrypt.hash(password, 10),
    };

    const newUser = await userService.createNewUser(userWithHashPassword);

    const user = await getUserLogin(req);

    if (newUser && user) {
        await actionService.createNewAction(
            user.id,
            `${user.userName} أضاف مستخدمًا جديدًا ${userName}`,
            `${user.userName} Add new user ${userName}`,
            "CREATE"
        );
    }

    res.status(201).json({
        message: "user added successfully",
        newUser,
    });
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { userName, password = null, password2 = null, role } = req.body;

    if (!id || !userName || !role) {
        return res.status(400).json({
            message: "Please provide all required fields",
        });
    }

    const updatedUser = {
        userName,
        role,
    };
    if (password || password2) {
        if (password !== password2) {
            return res.status(400).json({
                message: "The passwords do not match",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser.password = hashedPassword;
    }

    const result = await userService.modifyUser(id, updatedUser);

    if (!result) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.status(200).json({
        message: "User updated successfully",
        updateUser: result,
    });
}

async function removeUser(req, res) {
    const { id } = req.params;

    if (id != null) {
        await userService.removeUser(id);

        const user = await getUserLogin(req);
    
        if (newUser && user) {
            await actionService.createNewAction(
                user.id,
                `${user.userName} ازالة المستخدم ${userName}`,
                `${user.userName} remover user ${userName}`,
                "DELETE"
            );
        }
        res.status(201).json({
            message: "user removed successfully",
        });
    } else {
        res.status(500).json({
            message: "please check id of which user you want to remove",
        });
    }
}

async function loginUser(req, res) {
    const { userName, password } = req.body;

    if (!userName && !password) {
        throw makeError("Please provide userName and password", 400);
    }

    const user = await userService.findUserByUserName(userName);

    if (!user) {
        throw makeError("Username or password is wrong", 404);
    }

    const { id } = user;
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userName, id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        const user = await getUserLogin(req);
    
        if (newUser && user) {
            await actionService.createNewAction(
                user.id,
                `${userName} قامة تسجيل الدخول`,
                `${userName} user login`,
                "LOGIN"
            );
        }
        return res.status(201).json({
            token,
            userData: user,
            message: "user logged in successfully",
        });
    }
    return res.status(500).json({
        message: "userName or password WRONG !!",
    });
}

async function getAllUsers(_, res) {
    const users = await userService.listAllUsers();
    res.json(users);
}
async function getUserById(req, res) {
    const { id } = req.params;
    const users = await userService.findUserById(id);
    res.json(users);
}

export { addUser, removeUser, updateUser, loginUser, getAllUsers, getUserById };

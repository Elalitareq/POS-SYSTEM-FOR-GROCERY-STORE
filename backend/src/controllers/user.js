import userService from "../services/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { makeError } from "../utils/functions.js";

async function addUser(req, res) {
  const { email, password, role, password2 } = req.body;

  if (!email || !password || !role) {
    throw makeError("Please provide email, password and role", 400);
  }
  if (password !== password2) {
    throw makeError("Passwords do not match", 400);
  }

  const userWithHashPassword = {
    email,
    role,
    password: await bcrypt.hash(password, 10),
  };

  const newUser = await userService.createNewUser(userWithHashPassword);
  res.status(201).json({
    message: "user added successfully",
    newUser: newUser,
  });
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const hashPassword = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
    };
    if (!id) {
      res.status(500).json({
        message: "please provide the id of the user",
      });
    }
    if (body != null && body.password != null) {
      const updateUser = await userService.modifyUser(id, hashPassword);
      res.status(201).json({
        message: "user updated successfully",
        updateUser: updateUser,
      });
    } else {
      res.status(500).json({ message: "please check the require field" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to add user",
      error: error.message,
    });
  }
}

async function removeUser(req, res) {
  try {
    const { id } = req.params;

    if (id != null) {
      await userService.removeUser(id);
      res.status(201).json({
        message: "user removed successfully",
      });
    } else {
      res.status(500).json({
        message: "please check id of which user you want to remove",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove user",
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    throw makeError("Please provide email and password", 400);
  }

  const user = await userService.findUserByEmail(email);
  const { id } = user;
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      token: token,
      userData: user,
      message: "user logged in successfully",
    });
  }
  return res.status(500).json({
    message: "email or password WRONG !!",
  });
}

async function getAllUsers(_, res) {
  const users = await userService.listAllUsers();
  res.json(users);
}

export { addUser, removeUser, updateUser, loginUser, getAllUsers };

import userService from "../services/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function addUser(req, res) {
  try {
    const { body } = req;

    const hashPassword = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
    };

    if (body != null && body.password != null) {
      const newUser = await userService.createNewUser(hashPassword);
      res.status(201).json({
        message: "user added successfully",
        newUser: newUser,
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
  try {
    const { email, password } = req.body;

    const getTheUser = await userService.findUserByEmail(email);
    if (email && password) {
      if (bcrypt.compareSync(password, getTheUser.password)) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(201).json({
          token: token,
          userData: getTheUser,
          message: "user logged in successfully",
        });
      }
      return res.status(500).json({
        message: "email or password WRONG !!",
      });
    } else {
      return res.status(500).json({
        message:
          "please provide the email and password of which user you want to logged in",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login user",
      error: error.message,
    });
  }
}

async function getAllUsers(_, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

export { addUser, removeUser, updateUser, loginUser, getAllUsers };

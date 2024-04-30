// Example Express route using the product DAL
import userDal from "../dal/user.js";
import Express from "express";
import {
  removeUser,
  addUser,
  updateUser,
  loginUser,
  getAllUsers,
} from "../controllers/user.js";
import { allowRoles, verifyToken } from "../middleware/userPermission.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/user", tryCatch(getAllUsers));

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userDal.getUserById(id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.post("/create-user", tryCatch(addUser));

router.post(
  "/remove-user/:id",
  verifyToken,
  allowRoles(["ADMIN", "SUPERADMIN"]),
  removeUser
);

router.post(
  "/modify-user/:id",
  verifyToken,
  allowRoles(["ADMIN", "SUPERADMIN"]),
  updateUser
);

router.post("/login", loginUser);

export default router;

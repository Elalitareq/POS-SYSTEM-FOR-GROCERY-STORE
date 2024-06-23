// Example Express route using the product DAL
import Express from "express";
import {
  removeUser,
  addUser,
  updateUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.js";
import { allowRoles, verifyToken } from "../middleware/userPermission.js";
import { tryCatch } from "../utils/functions.js";

const router = Express.Router();

router.get("/users", verifyToken, tryCatch(getAllUsers));

router.get(
  "/user/:id",
  verifyToken,
  allowRoles(["ADMIN", "SUPERADMIN"]),
  tryCatch(getUserById)
);

router.post(
  "/create-user",
  // verifyToken,
  // allowRoles(['ADMIN', 'SUPERADMIN']),
  tryCatch(addUser)
);

router.post(
  "/remove-user/:id",
  verifyToken,
  allowRoles(["ADMIN", "SUPERADMIN"]),
  tryCatch(removeUser)
);

router.post(
  "/modify-user/:id",
  verifyToken,
  allowRoles(["ADMIN", "SUPERADMIN"]),
  tryCatch(updateUser)
);

router.post("/login", tryCatch(loginUser));

export default router;

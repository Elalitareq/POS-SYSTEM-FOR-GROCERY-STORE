// Example Express route using the product DAL
import userDal from "../dal/user.js";
import Express from "express";
import { removeUser, addUser, updateUser, loginUser } from "../controllers/user.js";

const router = Express.Router();

router.get("/user", async (req, res) => {
    try {
        const users = await userDal.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const users = await userDal.getUserById(id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

router.post("/create-user", addUser);
router.delete("/remove-user/:id", removeUser);
router.post("/modify-user/:id", updateUser);
router.post("/login", loginUser);

export default router;

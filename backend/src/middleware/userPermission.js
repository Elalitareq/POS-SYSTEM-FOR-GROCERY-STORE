import jwt from "jsonwebtoken";
import userDAL from "../dal/user.js";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Token is required" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userDAL.getUserById(decoded.id);
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

export const allowRoles = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.send({
    status: 403,
    message: "you are not allowed to access this resource",
  });
};

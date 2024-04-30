export const verifyToken = async (req, res, next) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  if (!authorization) {
    return res.send({ message: "Token is required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.send({ message: "Invalid token" });
  }
};

export const allowRoles = async (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.send({ message: "you are not allowed to access this resource" });
};

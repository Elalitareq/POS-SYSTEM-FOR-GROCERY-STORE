export async function isSuperAdmin(req, res, next) {
    const { role } = req.body;
    try {
        if (role === "ADMIN" || role === "EMPLOYEE") {
            return res.send({ message: "you are not a super admin" });
        }
        next();
    } catch (err) {
        next(err);
        res.send({ message: err.message });
    }
}

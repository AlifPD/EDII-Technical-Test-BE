const db = require("../database/models/index");
const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ info: "Unauthorized" })
    };

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(401).json({ info: "Unauthorized" });
        }

        req.user = await db.users.findByPk(user.id);
        next();
    });
};

module.exports = authJWT
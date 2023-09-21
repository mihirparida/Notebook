const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mihirisgoodb$oy"

const fetchuser = (req, res, next) => {
    //get user from just token & add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please use valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please use valid token" })
    }
}
module.exports = fetchuser;
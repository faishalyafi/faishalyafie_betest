import {verify_token} from '../helper/jwt.js'


async function authentification(req, res, next) {
    // bearer token
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify_token(token);

        if (!decoded) {
            return res.status(412).json({ status: 412, message: "token invalid" });
        }

        req.decoded = decoded
        next()
    } catch (error) {
        console.log(error);
        res.status(412).json({ status: 412, message: "token invalid" });
    }
}

export default authentification
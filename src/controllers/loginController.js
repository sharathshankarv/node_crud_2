const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const { loginServices } = require('../services');
const { ErrorMsgs } = require("../Constants");
const { hashPassword, verifyPassword } = require("../utilities/passwordUtils");

exports.saveLoginDetail = async (req, res) => {
    try {
        const hashedPassword = hashPassword(req.body.password);
        req.body.password = hashedPassword
        const user = await loginServices.saveLoginDetail(req.body);
        return res.json({ status: "success", data: user });
    } catch (e) {
        logger.error(`saveLoginDetail controller, ${e.message}`);
        return res.status(500).json({ error: e.message });
    }
}

exports.getUserDetail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            logger.error(`getUserDetail controller, Email is required, ${e.message}`);
            return res.status(400).json({ error: ErrorMsgs.EMAIL_REQUIRED });
        }
        const user = await loginServices.getLogin({ email: email });
        return res.status(200).json({ status: "success", data: user });
    } catch (e) {
        logger.error(`getUserDetail controller, ${e.message}`);
        return res.status(500).json({ error: e.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error(`Loing controller, Email and password are required, ${e.message}`);
            return res.status(400).json({ error: `${ErrorMsgs.EMAIL_REQUIRED}, ${ErrorMsgs.PASSWORD_REQUIRED}` });
        }

        const user = await loginServices.getLogin({ email: email });
        console.log("user", user)
        const verifyPass = await verifyPassword(password, user.password);
        if (!user) {
            logger.error(`Loing controller, user not found, ${e.message}`);
            return res.status(404).json({ error: ErrorMsgs.USER_NOT_FOUND });
        }

        if (!verifyPass) {
            logger.error(`Loing controller, Invalid password, ${e.message}`);
            return res.status(401).json({ error: ErrorMsgs.INVALID_PASSWORD });
        }

        if (user && verifyPass) {
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            return res.json({ status: "success", token: token });
        }


    } catch (e) {
        logger.error(`login check controller, ${e.message}`);
        return res.status(500).json({ error: e.message });
    }
}
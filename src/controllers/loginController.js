const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const loginService = require('../services/loginServices');
const { hashPassword, verifyPassword } = require("../utilities/passwordUtils");

exports.saveLoginDetail = async (req, res) => {
    try {
        const hashedPassword = hashPassword(req.body.password);
        req.body.password = hashedPassword
        const user = await loginService.saveLoginDetail(req.body);
        res.json({status: "success", data: user});
    } catch (e) {
        logger.error(`saveLoginDetail controller, ${e.message}`);
        res.status(500).json({ error: e.message }); 
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error(`Loing controller, Email and password are required, ${e.message}`);
            res.status(400).json({ error: "Email and password are required" });
        }

        const user = await loginService.getLogin({email: email});
        console.log("user", user)
        const verifyPass = await verifyPassword(password, user.password);
        if (!user) {
            logger.error(`Loing controller, user not found, ${e.message}`);
            res.status(404).json({ error: "User not found" });
        }

        if (!verifyPass) {
            logger.error(`Loing controller, Invalid password, ${e.message}`);
            res.status(401).json({ error: "Invalid password" });
        }

        if(user && verifyPass) {
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              });
            res.json({status: "success", token: token});
        }

        
    } catch (e) {
        logger.error(`login check controller, ${e.message}`);
        res.status(500).json({ error: e.message });
    }
}
const jwt = require("jsonwebtoken");
const loginService = require('../services/loginServices');
const { hashPassword, verifyPassword } = require("../utilities/passwordUtils");

exports.saveLoginDetail = async (req, res) => {
    try {
        const hashedPassword = hashPassword(req.body.password);
        req.body.password = hashedPassword
        const user = await loginService.saveLoginDetail(req.body);
        res.json({status: "success", data: user});
    } catch (e) {
        res.status(500).json({ error: e.message }); 
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
        }

        const user = await loginService.getLogin({email: email});
        console.log("user", user)
        const verifyPass = await verifyPassword(password, user.password);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        if (!verifyPass) {
            res.status(401).json({ error: "Invalid password" });
        }

        if(user && verifyPass) {
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              });
            res.json({status: "success", token: token});
        }

        
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
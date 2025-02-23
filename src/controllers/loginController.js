const loginService = require('../services/loginServices');
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = process.env.PASSWORD_SALT;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

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
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await loginService.getLogin(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({status: "success", data: user});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
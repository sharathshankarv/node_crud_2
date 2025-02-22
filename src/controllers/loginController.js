const loginService = require('../services/loginServices');

exports.saveLoginDetail = async (req, res) => {
    try {
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
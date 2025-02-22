const userServices = require('../services/userServices');

exports.saveUser = async (req, res) => {
    try {
        const user = await userServices.saveUser(req.body);
        res.status(200).json({ status: "success", data: user });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await userServices.getAllUser();
        res.status(200).json({ status: "success", data: users });
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userServices.getUser(req.email);
        if (user) {
            res.status(200).json({ status: "success", data: user })
        } else {
            res.status(200).json({ status: "NOT_FOUND", data: "user not found" });
        }
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}
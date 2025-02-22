const staffServices = require('../services/staffServices');

exports.saveStaff = async (req, res) => {
    try {
        const staff = await staffServices.saveStaff(req.body)
        res.status(200).json({ status: "success", data: staff });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}
 
exports.getAllStaff = async (req, res) => {
    try {
        const staffs = await staffServices.getAllStaff();
        res.status(200).json({ status: "success", data: staffs });
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
}

exports.getStaffDetail = async (req, res) => {
    try {
        const staff = await staffServices.getStaff(req.email);
        if (staff) {
            res.status(200).json({ status: "success", data: staff })
        } else {
            res.status(200).json({ status: "NOT_FOUND", data: "staff not found" });
        }
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}
const staffServices = require('../services/staffServices');
const loginServices = require('../services/loginServices');

exports.deleteStaff = async (req, res) => {
    try{
        const staff = await staffServices.deleteStaff(req.email);
        if(staff){
            const login = await loginServices.deleteLogin(req.email);
            if(login){
                res.status(200).json({ status: "success", data: staff });
            }
        }else{
            res.status(200).json({ status: "NOT_FOUND", data: "staff not found" });
        }
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
}

exports.saveStaff = async (req, res) => {
    try {
        const staff = await staffServices.saveStaff(req.body);
        if(!staff) {
            throw new Error("Staff not saved");
        }else{
            const login = await loginServices.saveLoginDetail({
                email: req.body.email,
                password: req.body.password,
                role: "staff",
                userRef: staff._id,
                roleRef: "Staff"
            });
            if(!login){
                const staff = await staffServices.deleteStaff(req.body.email);
                if(staff){
                    console.log("Staff deleted");
                }else{
                    console.log("Staff not deleted");
                }
                throw new Error("Login not saved");
            }
        }
        
        console.log(req.body, staff);
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
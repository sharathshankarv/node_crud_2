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
            logger.error(`staffController staff not found, ${e.message}`);
            res.status(200).json({ status: "NOT_FOUND", data: "staff not found" });
        }
    }
    catch(e){
        logger.error(`staffController, ${e.message}`);
        res.status(500).json({ error: e.message });
    }
}

exports.saveStaff = async (req, res) => {
    try {
        const staff = await staffServices.saveStaff(req.body);
        if(!staff) {
            logger.error(`staffController Staff not saved, ${e.message}`);
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
                    logger.info(`staffController Staff deleted, ${e.message}`);
                }else{
                    logger.error(`staffController Staff not deleted, ${e.message}`);
                    throw new Error("Staff not deleted");
                }
                logger.error(`staffController Login not saved, ${e.message}`);
                throw new Error("Login not saved");
            }
        }
        res.status(200).json({ status: "success", data: staff });
    }
    catch (e) {
        logger.error(`staffController save staff, ${e.message}`);
        res.status(500).json({ error: e.message })
    }
}
 
exports.getAllStaff = async (req, res) => {
    try {
        const staffs = await staffServices.getAllStaff();
        res.status(200).json({ status: "success", data: staffs });
    } catch (e) {
        logger.error(`staffController getAll staff, ${e.message}`);
        res.status(500).json({ "error": e.message });
    }
}

exports.getStaffDetail = async (req, res) => {
    try {
        const staff = await staffServices.getStaff(req.email);
        if (staff) {
            res.status(200).json({ status: "success", data: staff })
        } else {
            logger.error(`staffController staffNotFound, ${e.message}`);
            res.status(200).json({ status: "NOT_FOUND", data: "staff not found" });
        }
    } catch (e) {
        logger.error(`staffController getStaffDetail, ${e.message}`);

        res.status(500).json({
            error: e.message
        })
    }
}
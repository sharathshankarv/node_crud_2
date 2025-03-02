const { feeServices, loginServices } = require('../services');
const {getUserDetail} = require('./loginController');
const { isValidEmail } = require('../utilities');
const { ErrorMsgs, CONSTANTS } = require('../Constants');

exports.saveFees = async (req, res) => {
    try{
        const data = req.body;
        const response = await feeServices.saveFees(data);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.getFeesDetails = async (req, res) => {
    try{
        const {email} = req.query;
        if (!email) {
            return res.status(400).json({ message: ErrorMsgs.EMAIL_REQUIRED });
        }
        if(!isValidEmail(email)) {return res.status(400).json({message: ErrorMsgs.INVALID_EMAIL});}

        const userDetail = await loginServices.getLogin({ email: email });
        
        if(!userDetail) {
            logger.error(`getFeesDetails controller, Invalid user, ${e.message}`);
            return res.status(404).json({message: ErrorMsgs.USER_NOT_FOUND});
        }

        if(userDetail && userDetail.role === CONSTANTS.STUDENT){
            const feeDetails = await feeServices.getFeesDetail({email: email});
            const response = {
                student: userDetail,
                fees: feeDetails
            }

            return res.status(200).json(response);
            
        }else{
            logger.error(`getFeesDetails controller, User is not student, ${e.message}`);
            throw new Error(ErrorMsgs.INVALID_DATA);
        }
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}
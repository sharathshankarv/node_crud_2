const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const { loginServices, studentServices, staffServices } = require("../services");
const { ErrorMsgs, CONSTANTS } = require("../constants");
const { hashPassword, verifyPassword } = require("../utilities/passwordUtils");

const { errorMsgs } = ErrorMsgs;
exports.saveLoginDetail = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await loginServices.saveLoginDetail(req.body);
    return res.json({ status: "success", data: user });
  } catch (e) {
    logger.error(`saveLoginDetail controller, ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    if (!req.user || !req.user.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email, role, id } = req.user.user;
     if (!email) {
      logger.error(`getUserDetail controller, Email is required, ${e.message}`);
      return res.status(400).json({ error: errorMsgs.EMAIL_REQUIRED });
    }

    let user = await loginServices.getLogin({ email: email });
    let userData = user.toObject();
    
    if(role === CONSTANTS.STUDENT){
      let x = await studentServices.getStudentDetail({ email: email }); 
      userData = {...userData, ...x.toObject()};
      userData.role = CONSTANTS.STUDENT;
    }
    if(role === CONSTANTS.STAFF){
      let x = await staffServices.getStaff({ email: email });
      userData = {...userData, ...x.toObject()};
      userData.role = CONSTANTS.STAFF;
    }
    

    return res.status(200).json({ status: "success", data: userData });
  } catch (e) {
    logger.error(`getUserDetail controller, ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      logger.error(
        `Loing controller, Email and password are required, ${e.message}`
      );
      return res
        .status(400)
        .json({
          error: `${errorMsgs.EMAIL_REQUIRED}, ${errorMsgs.PASSWORD_REQUIRED}`,
        });
    }

    const user = await loginServices.getLogin({ email: email });
    let verifyPass = null;
    if (user) {
      verifyPass = await verifyPassword(password, user.password);
    }

    if (!user) {
      logger.error(`Loing controller, user not found`);
      return res.status(404).json({ error: errorMsgs.USER_NOT_FOUND });
    }
    if (!verifyPass) {
      logger.error(`Loing controller, Invalid password`);
      console.log("errorMsgs.INVALID_PASSWORD", errorMsgs.INVALID_PASSWORD);

      return res.status(400).json({ error: errorMsgs.INVALID_PASSWORD });
    }

    if (user && verifyPass) {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", // Cross-site cookies
        maxAge: 60 * 60 * 1000, // 1 hour
      });
      return res.json({ status: "success", token: "login Successfull" });
    }
  } catch (e) {
    logger.error(`login check controller, ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.user) {
      return res.status(401).json({ error: "Unauthorized" });
    } 

    return res.status(200).json({ status: "success", data: req.user.user });
  } catch (e) {
    logger.error(`getMe controller, ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
};

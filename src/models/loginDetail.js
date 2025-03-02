const mongoose = require('mongoose');
const { Roles, SubRoles, CONSTANTS } = require('../Constants');

const loginSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true }, // Store hashed password for security
    role: { type: String, enum: Roles, required: true }, // Helps in identifying user type
    subRole: { 
        type: String, 
        enum: SubRoles, 
        required: function() { return this.role === CONSTANTS.STAFF || this.role === CONSTANTS.STUDENT; } // Required for both roles
    },
    userRef: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "roleRef" }, // Dynamic Reference
    roleRef: { type: String, required: true, enum: [CONSTANTS.STAFF, CONSTANTS.STUDENT] } // Determines which collection to reference
})

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
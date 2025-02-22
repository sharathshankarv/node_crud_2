const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true }, // Store hashed password for security
    role: { type: String, enum: ["student", "staff"], required: true }, // Helps in identifying user type
    userRef: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "roleRef" }, // Dynamic Reference
    roleRef: { type: String, required: true, enum: ["Student", "Staff"] } // Determines which collection to reference
})

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
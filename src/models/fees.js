const mongoose = require("mongoose");
const {CONSTANTS} = require("../Constants");

mongoose.set("debug", true);

const feeSchema = new mongoose.Schema({
  email: { type: String, ref: CONSTANTS.STUDENT, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  dueAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  installmentCount: { type: Number, required: true, default: 4 }, // Configurable Installments
  installments: [
    {
      installmentNumber: { type: Number, required: true }, // 1, 2, 3, 4... based on configuration
      amount: { type: Number, required: true },
      dueDate: { type: Date, required: true },
      status: { type: String, enum: [CONSTANTS.PENDING,CONSTANTS.PAID, CONSTANTS.OVERDUE], default: CONSTANTS.PENDING},
      paidOn: { type: Date },
      receiptNumber: { type: String, unique: true, sparse: true }, // Receipt for payments
      paymentMode: { 
        type: String, 
        enum: [CONSTANTS.CASH, CONSTANTS.UPI,CONSTANTS.CREDIT_CARD, CONSTANTS.BANK_TRANSFER], 
        default: CONSTANTS.CASH 
      }
    }
  ],
  lateFee: { type: Number, default: 0 }, // Late fee if applicable
  status: { type: String, enum: [CONSTANTS.PENDING, CONSTANTS.PARTIALLY_PAID, CONSTANTS.PAID], default: CONSTANTS.PENDING },
  createdOn: { type: Date, default: Date.now }
});

// Function to auto-generate installments
feeSchema.pre("save", function (next) {
  if (this.installments.length === 0) {
    const perInstallmentAmount = Math.ceil(this.totalAmount / this.installmentCount);
    for (let i = 1; i <= this.installmentCount; i++) {
      this.installments.push({
        installmentNumber: i,
        amount: perInstallmentAmount,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + i)) // Monthly installments
      });
    }
  }
  next();
});

const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;

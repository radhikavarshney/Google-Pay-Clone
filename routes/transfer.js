const router = require("express").Router();
const User = require("../models/user");
const { generateCoupon } = require("../helpers/helperFunction.js");

router.post("/", async (req, res) => {
  const { senderNum, receiverNum, amount } = req.body;
  try {
    // Find sender and receiver
    const sender = await User.findOne({ phoneNum: senderNum });
    const receiver = await User.findOne({ phoneNum: receiverNum });

    // Validate input
    if (
      amount <= 0 ||
      !sender ||
      !receiver ||
      sender.phoneNum === receiver.phoneNum
    ) {
      return res.status(400).json("Invalid input or user not found");
    }

    // Validate sufficient funds
    if (sender.initialAmount < amount) {
      return res.status(400).json("Not enough amount available");
    }

    // Calculate cashback
    let cashback = 0;
    if (amount % 500 !== 0) {
      cashback = amount < 1000 ? amount * 0.05 : amount * 0.02;
    }

    // Update balances
    sender.initialAmount -= amount - cashback;
    receiver.initialAmount += parseInt(amount);

    // Create transaction objects
    const senderTransaction = {
      from: sender.phoneNum,
      to: receiver.phoneNum,
      amount: -amount,
      cashbacked: cashback,
    };

    const receiverTransaction = {
      from: sender.phoneNum,
      to: receiver.phoneNum,
      amount: +amount,
    };

    // Push transactions to user arrays
    sender.transactions.push(senderTransaction);
    receiver.transactions.push(receiverTransaction);

    // Use a transaction to ensure atomicity
    const session = await User.startSession();
    try {
      await session.withTransaction(async () => {
        await sender.save();
        await receiver.save();
      });

      const response = {
        message: "Transaction Successful",
        cashbackApplied: cashback,
        availableAmount: sender.initialAmount,
        transaction: sender.transactions,
      };

      // Additional logic for coupons
      if (amount % 500 === 0) {
        const randomNumber = Math.random();
        console.log(randomNumber);
        if (randomNumber > 0.5) {
          const coupon = generateCoupon();
          return res.status(200).json({
            msg: "Transaction Successful. You get a coupon.",
            coupon,
            response,
          });
        } else {
          return res.status(200).json({
            msg: "Transaction Successful. Better luck next time.",
            response,
          });
        }
      }

      return res.status(200).json(response);
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error("Transaction failed:", error);
    return res.status(500).json("Transaction failed");
  }
});

module.exports = router;

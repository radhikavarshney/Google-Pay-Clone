const router = require("express").Router();
const User = require("../models/user");

// Login
router.post("/login", async (req, res) => {
  try {
    const { phoneNum } = req.body;
    const user = await User.findOne({ phoneNum });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json("Login failed");
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { phoneNum, initialAmount } = req.body;

    // Check if user with the given phoneNum already exists
    const existingUser = await User.findOne({ phoneNum });

    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    if (initialAmount <= 0) {
      return res.status(400).json("Enter a valid amount greater than 0");
    }

    const newUser = new User({
      phoneNum,
      initialAmount,
    });

    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Registration failed:", error);
    return res.status(500).json("Registration failed");
  }
});

module.exports = router;

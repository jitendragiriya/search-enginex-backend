const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const jwt = require("jsonwebtoken");
const Users = require("../Models/users");
const bcrypt = require("bcrypt");

const secretKey = process.env.JSONWEBTOKEN_SECRET_KEY;

// Signup Controller
exports.register = CatchAsyncError(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new Users({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login Controller
exports.login = CatchAsyncError(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { _id: user._id, username: user.username },
        secretKey,
        {
          expiresIn: process.env.JSONWEBTOKEN_EXPIRESIN,
        }
      );
      res.json({ token });
    }
    return res.status(401).json({ message: "Authentication failed." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

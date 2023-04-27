require('dotenv').config()
const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const jwtManager = require("./access");


// POST /login
router.post("/", async (req, res) => {
  // login to create session
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      throw new Error("Email or Password are required");
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("User not found");
    }
    if (req.headers["x-session"]) {
      return res.status(200).json({
        session: req.headers.get("x-session"),
      });
    }
    // create new session
    const now = Date.now();
    const payloadForSession = {
      userId: user._id,
      email: user.email,
      username: user.username,
      iss: "https://www.superchat.me",
      exp: now + 31 * 24 * 3600 * 1000, // 31 days
    };
    const session = jwtManager.generate(payloadForSession);
    // 31 days for expire time
    const expire_time = now + 31 * 24 * 3600 * 1000;
    const createdSession = {
      userId: user._id,
      session: session,
      start_time: now,
      expire_time,
    };
    res.json(createdSession);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
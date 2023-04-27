const express = require("express");
const router = express.Router();
const { Message } = require("../models/messages");
var request = require('request');
const jwtManager = require("./access");

// send request to openai
async function requestOpenai(obj) {
  const apiKey = process.env.OPENAI_API_KEY;
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.openai.com/v1/chat/completions`, 
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(obj),
    }, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

// GET /messages
router.get("/", async (req, res) => {
  const session = req.headers["x-session"];
  const isValid = jwtManager.verify(session);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const messages = await Message.find({});
  res.json(messages);
});

// GET /messages/:id
router.get("/:id", async (req, res) => {
  const session = req.headers["x-session"];
  const isValid = jwtManager.verify(session);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const id = parseInt(req.params.id);
  const message = await Message.findOne({ id });
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

// POST /messages
router.post("/", async (req, res) => {
  const session = req.headers["x-session"];
  const isValid = jwtManager.verify(session);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { message, fromUser, toUser, robotData } = req.body;
  console.log("[debug] robotData", robotData);
  if (fromUser === toUser) {
    res.status(403).json({ error: "Fail to send a message to yourself" });
  }
  if (!message || !fromUser || !toUser) {
    res.status(400).json({ error: "Missing or invalid parameters" });
  } else {
    const messages_count = await Message.where({}).count();
    const id = messages_count + 1;
    const created_time = Date.now();
    const newMessage = new Message({
      id,
      message,
      fromUser,
      toUser,
      created_time,
    });
    await newMessage.save();
    console.log(`[log] save new message from ${fromUser} to ${toUser}, ${message}`);
    // TODO add prompt as system role
    const replyObjString = await requestOpenai({
      user: fromUser,
      model: "gpt-3.5-turbo",
      temperature: 1,
      n: 1,
      max_tokens: 2000,
      presence_penalty: 0,
      messages: [
        { role: "system", content: robotData.prompt || 'You are a nice chat robot.'},
        { role: "user", content: message }],
    });
    const replyObj = JSON.parse(replyObjString);
    if (
      !Array.isArray(replyObj.choices) ||
      !replyObj.choices[0].message
    ) {
      console.log("[ERROR] Fail to get reply from AI chatbot,", JSON.stringify(replyObj))
      return res.status(500).json({
        error: "Fail to get reply from AI chatbot",
      });
    }
    const newReply = new Message({
      id: id + 1,
      message: replyObj.choices[0].message.content,
      fromUser: toUser,
      toUser: fromUser,
      created_time: Date.now(),
    });
    await newReply.save();
    console.log(`[LOG] save new reply from AI, message:${replyObj.choices[0].message.content}`)
    res.json(replyObj.choices[0].message);
  }
});

// PUT /messages/:id
router.put("/:id", async (req, res) => {
  const session = req.headers["x-session"];
  const isValid = jwtManager.verify(session);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const id = parseInt(req.params.id);
  const { message } = req.body;
  const update = await Message.findOneAndUpdate(
    {
      id: id,
    },
    { message },
    { new: true }
  );
  res.json(update);
});

// DELETE /messages/:id
router.delete("/:id", async (req, res) => {
  const session = req.headers["x-session"];
  const isValid = jwtManager.verify(session);
  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const id = parseInt(req.params.id);
  const del = await Message.findOneAndDelete({
    id: id,
  });
  res.json(del);
});

module.exports = router;

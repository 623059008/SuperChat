const express = require("express");
const router = express.Router();
const { Message } = require("../models/messages");
const { User, Purchase } = require("../models/users");

// GET /messages
router.get("/", async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

// GET /messages/:id
router.get("/:id", async (req, res) => {
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
  const { message, fromUser, toUser } = req.body;
  if(fromUser === toUser) {
    res.status(403).json({error: 'Fail to send a message to yourself'})
  }
  if (!message || !fromUser || !toUser) {
    res.status(400).json({ error: "Missing or invalid parameters" });
  } else {
    const fromUserObj = await User.findOne({ id: parseInt(fromUser) });
    const toUserObj = await User.findOne({ id: parseInt(toUser) });

    if (!fromUserObj) {
      res.status(404).json({ error: "Sender not found" });
    } else if (!toUserObj) {
      res.status(404).json({ error: "Recipient not found" });
    } else {
      const purchase = await Purchase.findOne({ userId: parseInt(fromUser) });
      if (!purchase) {
        res.status(403).json({ error: "Sender has not purchased a pass" });
      } else if (purchase.usedCount >= purchase.maxCount) {
        res.status(403).json({ error: "Sender has exceeded message limit" });
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
        await Purchase.findOneAndUpdate(
          {
            _id: purchase._id,
          },
          {
            usedCount: purchase.usedCount + 1,
          }
        );
        res.status(201).json(newMessage);
      }
    }
  }
});

// PUT /messages/:id
router.put("/:id", async (req, res) => {
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
  const id = parseInt(req.params.id);
  const del = await Message.findOneAndDelete({
    id: id,
  });
  res.json(del);
});

module.exports = router;
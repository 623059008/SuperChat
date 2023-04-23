const express = require("express");
const router = express.Router();
const { User, Purchase } = require("../models/users");

// GET /users
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findOne({ id });
  const purchases = await Purchase.find({userId: id});
  if (user) {
    res.json({user, purchases});
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// POST /users
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ error: "Missing or invalid parameters" });
  } else {
    const users_count = await User.where({}).count();
    const id = users_count + 1;
    const user = new User({ id, username, email, password });
    await user.save();
    res.status(201).json(user);
  }
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password } = req.body;
  const user = await User.findOneAndUpdate(
    { id },
    {
      username,
      email,
      password,
    },
    {
      new: true
    }
  );
  res.json(user);
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findOneAndDelete({ id });
  res.json(user);
});

// POST /users/:id/purchases
router.post("/:id/purchases", async (req, res) => {
  const id = parseInt(req.params.id);
  const { type, start_time, expire_time, maxCount, purchase_key } = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    res.status(404).json({ error: "User not found, fail to create a purchase record for this user" });
  } else if (!type || !maxCount || !purchase_key) {
    res.status(400).json({ error: "Missing or invalid parameters" });
  } else {
    const purchaseCount = await Purchase.where({ userId: user.id }).count();
    const purchase = new Purchase({
      userId: user.id,
      id: purchaseCount + 1,
      type,
      start_time,
      expire_time,
      usedCount: 0,
      maxCount,
      purchase_key,
    });
    await purchase.save();
    res.status(201).json(purchase);
  }
});

// GET /users/:id/purchases
router.get("/:id/purchases", async (req, res) => {
  const id = parseInt(req.params.id);
  const purchase = await Purchase.findOne({ userId: id });
  if (!purchase) {
    res.status(404).json({ error: "This user doesn't have an purchase." });
  } else {
    res.json(purchase);
  }
});

// PUT /users/:id/purchases/:pid
router.put("/:id/purchases/:pid", async (req, res) => {
  const id = parseInt(req.params.id);
  const pid = parseInt(req.params.pid);
  const { type, start_time, expire_time, maxCount, purchase_key } = req.body;
  const purchase = await Purchase.findOne({ userId: id });
  if (!purchase) {
    return res.status(404).json({ error: "Purchase not found" });
  }
  if (!type || !maxCount || !purchase_key) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }
  purchase.type = type;
  purchase.start_time = start_time;
  purchase.expire_time = expire_time;
  purchase.maxCount = maxCount;
  purchase.purchase_key = purchase_key;
  await purchase.save();
  res.json(purchase);
});

// DELETE /users/:id/purchases/:pid
router.delete("/:id/purchases/:pid", async (req, res) => {
  const id = parseInt(req.params.id);
  const pid = parseInt(req.params.pid);
  const del = await Purchase.findOneAndDelete({
    userId: id
  });
  
  return res.json(del);
});

module.exports = router;

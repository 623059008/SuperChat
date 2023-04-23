const express = require('express');
const path = require("path");
const router = require("express").Router();

const MessageApi = require("./messages");
const UserApi = require("./users");


// API Routes
router.use("/messages", MessageApi);
router.use("/users", UserApi);


// When an unknown route is hit, send the React app
router.use(express.static(path.join(__dirname, '../../client/build')));
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});


// Exports Router
module.exports = router;
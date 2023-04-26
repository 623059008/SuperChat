const express = require('express');
const path = require("path");
const passport = require('passport');
const router = require("express").Router();

const MessageApi = require("./messages");
const UserApi = require("./users");
const LoginApi = require("./login");


// API Routes
router.use("/messages", MessageApi);
router.use("/users", UserApi);
router.use("/login", LoginApi);


// When an unknown route is hit, send the React app
router.use(express.static(path.join(__dirname, '../../client/build')));
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

router.use(passport.initialize());
router.use(passport.session());


// Exports Router
module.exports = router;
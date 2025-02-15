const express = require('express');
const router = express.Router();

let health = require("./health");

router.use(health);

module.exports = router
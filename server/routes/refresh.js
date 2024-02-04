const express = require("express");
const { generateAccessToken } = require("../controllers/refresh");

const router = express.Router();

router.post("/generate", generateAccessToken);

module.exports = router;

const express = require("express");
const { signUp, signIn } = require("../controllers/auth");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);


module.exports = router;

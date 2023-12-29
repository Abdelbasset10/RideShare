const express = require("express");
const { updateUser } = require("../controllers/user");
const {isSignIn} = require("../middleware/index")

const router = express.Router();

router.patch('/update/:id',isSignIn,updateUser)


module.exports = router;

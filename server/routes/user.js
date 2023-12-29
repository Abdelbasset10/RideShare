const express = require("express");
const { updateUser, deleteUser, getUsers, getUser } = require("../controllers/user");
const {isSignIn, isAdmin} = require("../middleware/index")

const router = express.Router();

router.patch('/update/:id',isSignIn,updateUser)
router.delete('/delete/:id',isSignIn,deleteUser)
router.get('/all',isAdmin,getUsers)
router.get('/:id',isSignIn,getUser)


module.exports = router;

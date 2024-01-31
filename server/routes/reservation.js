const express = require("express");
const { getUserReservations, updateReservations } = require("../controllers/reservation");
const {isSignIn, isAdmin} = require("../middleware/index")

const router = express.Router();

router.get('/:id',isSignIn,getUserReservations)
router.patch('/:id',isSignIn,updateReservations)

module.exports = router;
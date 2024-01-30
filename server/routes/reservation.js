const express = require("express");
const { getUserReservations } = require("../controllers/reservation");
const {isSignIn, isAdmin} = require("../middleware/index")

const router = express.Router();

router.get('/:id',isSignIn,getUserReservations)


module.exports = router;
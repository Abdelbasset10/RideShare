const express = require("express");
const { getUserReservations, updateReservations, deleteReservation } = require("../controllers/reservation");
const {isSignIn, isAdmin} = require("../middleware/index")

const router = express.Router();

router.get('/:id',isSignIn,getUserReservations)
router.patch('/:id',isSignIn,updateReservations)
router.delete('/:id',isSignIn,deleteReservation)

module.exports = router;
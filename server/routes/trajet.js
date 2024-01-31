const express = require("express");
const { createTrajet, reserverTrajet, getCloseTrajets, getAllTrajets, getTrajet, updateTrajet, deleteTrajet, getUserTrajets} = require("../controllers/trajet");
const { isSignIn } = require("../middleware");

const router = express.Router();

router.post("/create",isSignIn, createTrajet);
router.get("/",getAllTrajets)
router.get("/:id",getTrajet)
router.get("/close",getCloseTrajets)
router.get("/user/:id",isSignIn,getUserTrajets)
router.patch('/update/:id',isSignIn,updateTrajet)
router.patch('/reserver/:id',isSignIn,reserverTrajet)
router.delete('/delete/:id',isSignIn,deleteTrajet)



module.exports = router;

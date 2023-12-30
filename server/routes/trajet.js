const express = require("express");
const { createTrajet, reserverTrajet, getCloseTrajets, getAllTrajets, getTrajet, updateTrajet, deleteTrajet} = require("../controllers/trajet");

const router = express.Router();

router.post("/create", createTrajet);
router.get("/",getAllTrajets)
router.get("/:id",getTrajet)
router.get("/close",getCloseTrajets)
router.patch('/update/:id',updateTrajet)
router.patch('/reserver/:id',reserverTrajet)
router.delete('/delete/:id',deleteTrajet)



module.exports = router;

const express = require("express");
const router = express.Router();
const {
    createWood,
    getWoods,
    getWood,
    updateWood,
    deleteWood,
} = require("../controller/woodontroller");

router.post("/", createWood);
router.get("/", getWoods);
router.get("/:id", getWood);
router.put("/:id", updateWood);
router.delete("/:id", deleteWood);

module.exports = router;

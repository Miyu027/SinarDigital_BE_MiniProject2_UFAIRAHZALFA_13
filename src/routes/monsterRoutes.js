const express = require("express");
const router = express.Router();
const monsterController = require("../controllers/monsterController");
const upload = require("../config/multer");

router.post("/", upload.single("image"), monsterController.create);

router.get("/", monsterController.getAll);

router.get("/:id", monsterController.getOne);

router.put("/:id", upload.single("image"), monsterController.update);

router.delete("/:id", monsterController.delete);

module.exports = router;

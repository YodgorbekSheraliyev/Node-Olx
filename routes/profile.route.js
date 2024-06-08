const { Router } = require("express");
const {getProfilePage} = require("../controllers/profile.controller");

const router = Router();

router.get("/:id", getProfilePage);

module.exports = router;

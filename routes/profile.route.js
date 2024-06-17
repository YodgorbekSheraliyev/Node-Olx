const { Router } = require("express");
const {getProfilePage, updateUserPage, updateUser} = require("../controllers/profile.controller");

const router = Router();

router.get("/change", updateUserPage);
router.post("/change", updateUser);
router.get("/:id", getProfilePage);

module.exports = router;

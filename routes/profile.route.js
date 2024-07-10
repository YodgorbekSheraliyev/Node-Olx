const { Router } = require("express");
const {getProfilePage, updateUserPage, updateUser, getMyProfilePage} = require("../controllers/profile.controller");
const upload = require("../utils/fileUpload");

const router = Router();

router.get("/change", updateUserPage);
router.post("/change", upload.single('avater'), updateUser);
router.get("/my/:id", getMyProfilePage);
router.get("/:id", getProfilePage);

module.exports = router;

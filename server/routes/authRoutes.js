const express = require("express");
const {
  registerUser,
  verifAccount,
  login,
  logout,
  resetPassword,
} = require("../controllers/auth.controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Route working");
});

// ⬇️ Use multer to handle file uploads
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  registerUser
);

router.post("/verify-account", verifAccount);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);

module.exports = router;

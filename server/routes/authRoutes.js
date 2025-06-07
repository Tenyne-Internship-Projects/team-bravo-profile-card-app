const express = require("express");
const {
  registerUser,
  login,
  logout,
} = require("../controllers/auth.controller");
const upload = require("../middlewares/uploads");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Route working");
});

router.post(
  "/register",

  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  registerUser
);

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;

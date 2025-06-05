const express = require("express");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Route working");
});

// Middleware for file upload (if using multer)
const upload = require("../middleware/uploadMiddleware"); // optional, only if you're uploading avatar/docs

// @route   GET /api/users
router.get("/", getAllUsers);

// @route   GET /api/users/:userId
router.get("/:userId", getUserProfile);

// @route   PUT /api/users/:userId
router.put(
  "/:userId",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  updateUserProfile
);

// @route   DELETE /api/users/:userId
router.delete("/:userId", deleteUserAccount);

module.exports = router;

module.exports = router;

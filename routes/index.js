const express = require("express");
const {
  addad,
  getAllads,
  getAdBySearchQuery,
  updateAdById,
  deleteAddById,
} = require("../controllers/ad");
const { addPost, getPostBySearchQuery } = require("../controllers/post");
const authenticateToken = require("../Middlewares/ProtectedRoute");
const { login, register } = require("../controllers/auth");
const { addOutBound } = require("../controllers/outbound");
const router = express.Router();

router.post("/add-ad", authenticateToken, addad);
router.delete("/delete-ad/:id", authenticateToken, deleteAddById);
router.get("/get-ads",authenticateToken, getAllads);
router.put("/update-ad", authenticateToken, updateAdById);
router.post("/bound-add", authenticateToken, addOutBound);
router.get("/get-ad", getAdBySearchQuery);
router.post("/add-post", addPost);
router.get("/get-post", getPostBySearchQuery);


router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;

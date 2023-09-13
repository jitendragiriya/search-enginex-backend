const express = require("express");
const { addad, getAllads, getAdBySearchQuery, updateAdById, deleteAddById } = require("../controllers/ad");
const { addPost, getPostBySearchQuery } = require("../controllers/post");
const router = express.Router();

router.post("/add-ad", addad);
router.delete("/delete-ad/:id", deleteAddById);
router.get("/get-ads", getAllads);
router.put("/update-ad", updateAdById);
router.get("/get-ad", getAdBySearchQuery);
router.post("/add-post", addPost);
router.get("/get-post", getPostBySearchQuery);

module.exports = router;

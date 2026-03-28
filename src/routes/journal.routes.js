const express = require("express");
const router = express.Router();
const {
  createJournal,
  getPublicFeed,
  getMyJournals,
  getJournalById,
  updateJournal,
  toggleVisibility,
  deleteJournal,
} = require("../controllers/journal.controller");
const { protect } = require("../middleware/auth");

router.get("/feed", getPublicFeed);

router.get("/my", protect, getMyJournals);

router.post("/", protect, createJournal);

router.get("/:id", optionalAuth, getJournalById);

router.put("/:id", protect, updateJournal);

router.patch("/:id/visibility", protect, toggleVisibility);

router.delete("/:id", protect, deleteJournal);

function optionalAuth(req, res, next) {
  const jwt = require("jsonwebtoken");
  const User = require("../models/User");

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.id).then((user) => {
        req.user = user || null;
        next();
      });
    } catch {
      req.user = null;
      next();
    }
  } else {
    req.user = null;
    next();
  }
}

module.exports = router;

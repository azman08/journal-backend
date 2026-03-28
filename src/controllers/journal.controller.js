const Journal = require("../models/Journal");

// Create a new journal entry
const createJournal = async (req, res) => {
  try {
    const { title, content, visibility, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    const journal = await Journal.create({
      title,
      content,
      visibility: visibility || "private",
      tags: tags || [],
      author: req.user._id,
    });

    await journal.populate("author", "name email");

    res.status(201).json({ success: true, journal });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("Create journal error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get all PUBLIC journals (feed)
const getPublicFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [journals, total] = await Promise.all([
      Journal.find({ visibility: "public" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email"),
      Journal.countDocuments({ visibility: "public" }),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      journals,
    });
  } catch (error) {
    console.error("Public feed error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get all journals of the logged-in user
const getMyJournals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional filter by visibility
    const filter = { author: req.user._id };
    if (req.query.visibility) {
      filter.visibility = req.query.visibility;
    }

    const [journals, total] = await Promise.all([
      Journal.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email"),
      Journal.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      journals,
    });
  } catch (error) {
    console.error("My journals error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get a single journal by ID
const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, message: "Journal not found." });
    }

    if (journal.visibility === "private") {
      if (
        !req.user ||
        journal.author._id.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "This journal is private.",
        });
      }
    }

    res.status(200).json({ success: true, journal });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid journal ID." });
    }
    console.error("Get journal error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Update a journal entry
const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, message: "Journal not found." });
    }

    if (journal.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this journal.",
      });
    }

    const { title, content, visibility, tags } = req.body;

    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (visibility !== undefined) journal.visibility = visibility;
    if (tags !== undefined) journal.tags = tags;

    await journal.save();
    await journal.populate("author", "name email");

    res.status(200).json({ success: true, journal });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid journal ID." });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("Update journal error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Toggle journal
const toggleVisibility = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, message: "Journal not found." });
    }

    if (journal.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this journal.",
      });
    }

    journal.visibility = journal.visibility === "public" ? "private" : "public";
    await journal.save();
    await journal.populate("author", "name email");

    res.status(200).json({
      success: true,
      message: `Journal is now ${journal.visibility}.`,
      journal,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid journal ID." });
    }
    console.error("Toggle visibility error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Delete a journal entry
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res
        .status(404)
        .json({ success: false, message: "Journal not found." });
    }

    if (journal.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this journal.",
      });
    }

    await journal.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Journal deleted successfully." });
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid journal ID." });
    }
    console.error("Delete journal error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  createJournal,
  getPublicFeed,
  getMyJournals,
  getJournalById,
  updateJournal,
  toggleVisibility,
  deleteJournal,
};

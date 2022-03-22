const express = require("express");
const { Language } = require("../models/language");
const router = express.Router();

router.get("/", async (req, res) => {
  const languages = await Language.find({});
  if (!languages) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(languages);
});

router.get("/active", async (req, res) => {
  const languages = await Language.find({ isActive: true });
  if (!languages) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(languages);
});

router.post("/", (req, res) => {
  const language = new Language(req.body);
  language
    .save()
    .then((savedLanguage) => {
      res.status(201).json(savedLanguage);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        success: false,
      });
    });
});

module.exports = router;

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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const language = await Language.findById(id);
  if (!language) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(language);
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

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedLanguage = req.body;
  Language.findByIdAndUpdate(
    id,
    updatedLanguage,
    { new: true },
    (err, lang) => {
      console.log(lang);
      if (err) {
        res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      res.status(200).json(lang);
    }
  );
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  Language.findByIdAndDelete(id)
    .then(() => {
      res.status(201).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        success: false,
      });
    });
});

module.exports = router;

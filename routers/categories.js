const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find({ parentCategoryId: null });
  if (!categories) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(categories);
});

router.get("/active", async (req, res) => {
  const categories = await Category.find({
    isActive: true,
    parentCategoryId: null,
  });
  if (!categories) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "category not found",
      });
    }
    res.send(category);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { parentCategoryId, ...rest } = req.body;
  let savedCategory;
  const category = new Category({
    ...rest,
    parentCategoryId,
    icon: `https://dummyimage.com/48x48/0e0/fff&text=${req.body.slug}`,
    thumbnail: "https://picsum.photos/240/150",
  });

  try {
    savedCategory = await category.save();

    const parentCategory = await Category.findById(parentCategoryId);
    if (parentCategory) {
      parentCategory.children = [...parentCategory.children, savedCategory.id];
      await parentCategory.save();
    } else {
      res.status(400).json({
        success: false,
        error: "parent category not found",
      });
    }
    res.status(201).json(savedCategory);
  } catch (e) {
    res.status(500).json({
      error: e.message,
      success: false,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCategory = req.body;
  Category.findByIdAndUpdate(id, updatedCategory, { new: true }, (err, cat) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    res.status(200).json(cat);
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
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

import Help from "../models/Help.js";

// GET ALL FAQs - Appear on users screen
export const getFAQs = async (req, res) => {
  try {
    const faqs = await Help.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Failed to load FAQs" });
  }
};

// ADMIN: Add FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer required" });
    }

    const faq = await Help.create({
      question,
      answer,
      category,
    });

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const faq = await Help.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const faq = await Help.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

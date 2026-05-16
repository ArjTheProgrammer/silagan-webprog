const Article = require('../models/Article');

const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((p) => String(p).trim()).filter(Boolean);
  }

  if (typeof content === 'string') {
    return content
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  return [];
};

const getArticles = async (req, res) => {
  try {
    const { status, isActive, active } = req.query;
    let filter = {};

    if (status === 'active' || status === 'inactive') {
      filter.isActive = status === 'active';
    } else if (typeof isActive !== 'undefined') {
      filter.isActive = String(isActive) === 'true';
    } else if (typeof active !== 'undefined') {
      filter.isActive = String(active) === 'true';
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.slug });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, title, imageLink, isActive } = req.body;
    const content = normalizeContent(req.body.content);

    if (!name || !title) {
      return res.status(400).json({ message: 'Name and title are required' });
    }

    if (!content.length) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const article = await Article.create({
      name,
      title,
      imageLink,
      content,
      isActive,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(updates, 'content')) {
      updates.content = normalizeContent(updates.content);
    }

    const article = await Article.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};

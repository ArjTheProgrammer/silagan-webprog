const express = require('express');
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.get('/slug/:slug', getArticleBySlug);
router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;

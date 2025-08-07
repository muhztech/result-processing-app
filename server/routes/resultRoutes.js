const express = require('express');
const router = express.Router();

const {
  createResult,
  getAllResults,
  updateResult,
  deleteResult
} = require('../controllers/resultController');

router.post('/', createResult);
router.get('/', getAllResults);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult); // ✅ admin-only frontend controlled

module.exports = router;

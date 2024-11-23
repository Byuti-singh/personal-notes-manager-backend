const express = require('express');
const { addNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();

router.post('/notes', addNote);
router.get('/notes', getNotes);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;

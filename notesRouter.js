const express = require ('express'),
    {createNote, getNoteById, checkNoteById, updateNoteById, deleteNote, getNotes} = require('./notesService.js'),
    {auth} = require('./middleware/auth.js');

const router = express.Router();

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.get('/:id', auth, getNoteById);
router.patch('/:id', auth, checkNoteById);
router.put('/:id', auth, updateNoteById);
router.delete('/:id', auth, deleteNote);

module.exports = {
    notesRouter: router,
}

import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = express.Router();

router.get('/notes', getAllNotes);

router.get('/notes/:noteId', getNoteById);

router.delete('/notes/:noteId', deleteNote);

router.post('notes', createNote);

router.patch('/notes/:noteId', updateNote);

export default router;

import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const perPage = Number(req.query.perPage);
    const { tag, search } = req.query;
    const userId=req.user._id;
    const filter = {userId};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * perPage;

    const [notes, totalNotes] = await Promise.all([
      Note.find(filter).skip(skip).limit(perPage),
      Note.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalNotes / perPage);
    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const { noteId } = req.params;
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const newNote = await Note.create({ ...req.body, userId });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const { noteId } = req.params;
    const note = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const { noteId } = req.params;
    const updatedNote = await Note.findOneAndUpdate({ _id: noteId, userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

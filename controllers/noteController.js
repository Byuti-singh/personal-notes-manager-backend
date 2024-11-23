const Note = require('../models/Note');

// Add a new note
const addNote = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const note = new Note({ title, description, category });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all notes
const getNotes = async (req, res) => {
    const { search, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    try {
        const notes = await Note.find(filter).sort({ created_at: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addNote, getNotes, updateNote, deleteNote };

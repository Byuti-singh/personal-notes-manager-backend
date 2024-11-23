const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Work', 'Personal', 'Others'], default: 'Others' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', noteSchema);

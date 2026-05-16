const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    dateRegistered: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
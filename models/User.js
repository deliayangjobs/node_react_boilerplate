const mongoose = require('mongoose');
// const Schema = mongoose.Schema; same as below line
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0}
});

// create a collection of userSchema, name of collection users
// only create when not exist yet
mongoose.model('users', userSchema);

const {Schema, model} = require('mongoose');

const _userSchema = new Schema({
    email: String,
    password: String
},{
    timestamps: true
});

module.exports = model('User',  _userSchema);
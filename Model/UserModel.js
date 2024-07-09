const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 40
    }
});

module.exports = mongoose.model("UserInfo", UserSchema);
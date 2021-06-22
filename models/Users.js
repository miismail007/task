const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    user_name : {
        type: String,
        default:"",
    },
    user_email : {
        type : String,
        required : true
    },
    user_password : {
        type : String,
        default : "",
    },
    user_mobile : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Users',UserSchema, "Users_table");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:  String,
    lastName: String,
    email: {type: String,unique: true},
    password: String,
    // company: {
    //     type: Schema.Types.ObjectId,
    //     ref:'Company'
    // },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
});

mongoose.model('User', UserSchema);
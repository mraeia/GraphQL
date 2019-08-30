const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:  String,
    email: String,
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
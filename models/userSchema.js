const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = mongoose.Schema({
  username : {
    type: String,
    unique: true,
    required:true
  },
  name: String,
  password: String,
  email: String,
  admin : Boolean
});

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

let User = mongoose.model('user',userSchema);



module.exports = User;

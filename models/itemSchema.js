const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let itemSchema = mongoose.Schema({
  item: String,
  price: Number,
  image : String,
  stock : Number,
  description : String
});

let Item = mongoose.model('item',itemSchema);



module.exports = Item ;

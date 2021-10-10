const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner:  { type: Schema.Types.ObjectId, ref: 'User'},
    image: String,
    title: String,
    description: String,
    price: Number,
    crated: { type: Date, default: Date.now }
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });

let Model =  mongoose.model('Product', ProductSchema);


module.exports = Model
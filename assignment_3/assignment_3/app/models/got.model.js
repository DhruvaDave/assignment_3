const mongoose = require('mongoose');

// mongoose.model('battles_test', 
// new Schema({ url: String, text: String, id: Number}), 
// 'battles_test');

const movieSchema = mongoose.Schema(
    {
    // _id: mongoose.Schema.ObjectId,
    title: String,
    timing: Date,
    location: String,
    
    },
    { timestamps: true }
);

movieSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model("movie_struct",movieSchema)

// mongo "mongodb+srv://cluster0-e8e2r.mongodb.net/test"  --username dhruva
// mongo "mongodb+srv://cluster0-e8e2r.mongodb.net/test"  --username dhruva
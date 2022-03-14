const mongoose = require('mongoose');
const { Schema } = mongoose

const postSchema = new Schema({
    name: { type: String },
    body: {type: String  },
    image: {type: String},
    user: {type: mongoose.Types.ObjectId ,ref:'Users'}
})

const Post = mongoose.model('Posts',postSchema)

module.exports = Post;
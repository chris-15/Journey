const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'You need to write a post!',
            minLength: 1,
            maxLength: 5000,
        },
        postTitle: {
            type: String,
            required: 'You need a title!',
            minLength: 1,
            maxLength: 50,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)            
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema)

module.exports = Post;
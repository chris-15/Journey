const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'You need to write a post!',
            minLength: 1,
            maxLength: 5000,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add util function for date
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
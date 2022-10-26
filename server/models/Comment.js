const { Schema } = require('mongoose');

const commentSchema = new Schema (
    {
        commentText: {
            type: String,
            required: true,
            maxLength: 500
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add util function for date
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = commentSchema;
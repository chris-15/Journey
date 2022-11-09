const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email:  String
        posts: [Post]
    },

    type Post {
        _id: ID
        postText: String
        createdAt: String
        username: String
        commentCount: Int
        comments:[Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        createdAt: String
        username: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        posts: [Post]
        post(_id: ID!): Thought
    }
`;

module.exports = typeDefs;
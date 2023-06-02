import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      postTitle
      createdAt
      category
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      postTitle
      createdAt
      category
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postText
        postTitle
        createdAt
        category
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
   {
    me {
      _id
      username
      email
      posts {
        _id
        postText
        postTitle
        createdAt
        category
        commentCount
        comments {
          _id
          createdAt
          commentText
          username
        }
      }
    }
  }
`;

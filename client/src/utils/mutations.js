import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $postTitle: String!, $category: String!) {
    addPost(postText: $postText, postTitle: $postTitle, category: $category) {
      _id
      postText
      postTitle
      createdAt
      category
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      commentCount
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletedPost(postId: $postId) {
      _id
      postText
      postTitle
      createdAt
      category
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//uncomment when client is set up

//serve up static assets
// app.use('/images', express.static(path.join(__dirname, '../client/images')))

/* if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  } */

/* 
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build/index.html'));
  }); */

// Create a new instance of an Apollo server withe the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// call th async funciton to start the server
startApolloServer(typeDefs, resolvers);

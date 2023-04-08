import Nav from "./components/Nav";

//apolloProvider provides data to the components
//ApolloClient initializes the connection to graphql
//InMemoryCache caches api response more efficiently
//createHttpLink apollo client makes requests
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Nav />
      </div>
    </ApolloProvider>
  );
}

export default App;

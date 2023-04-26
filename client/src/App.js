import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login"
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

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-col justify-start min-h-screen">
          <Nav />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

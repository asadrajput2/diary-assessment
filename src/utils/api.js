import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://quinncareapidev.azurewebsites.net/api/graph"
});

export default client;
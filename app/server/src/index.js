require('dotenv').config();

const {
    ApolloServer
} = require('apollo-server');
const typeDefs = require('./schema.graphql');

const server = new ApolloServer({
    typeDefs
});
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: "*",
        credentials: true,
    },
});

server.listen({ port: 4000, host: '0.0.0.0' }).then(({ url }) => {
    console.log('Server ready');
});

import express, { Application, json } from 'express';
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from './resolvers.js';
import { readFileSync } from 'fs';
import cors from 'cors';


const ExpressConfig = (): Application => {
  const app = express();
  return app;
};

const app = ExpressConfig();
const typeDefs = gql(
  readFileSync('schema.graphql', {
    encoding: 'utf-8',
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();


app.use('/graphql', cors(), json(), expressMiddleware(server));

app.get('/health', (req, res) => res.json({ message: 'Hello from express server' }));

app.listen(Number(process.env.PORT) ?? 3000,() => {
  console.log('Server is running on port', process.env.PORT ?? 3000);
});

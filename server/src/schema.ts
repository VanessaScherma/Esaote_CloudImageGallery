import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    id: ID!
    url: String!
    likes: Int!
    featured: Boolean!
  }

  type Query {
    images: [Image!]!
  }

  type Mutation {
    likeImage(id: ID!): Image!
    deleteImage(id: ID!): Boolean!
    markFeatured(id: ID!): Image!
  }
`;
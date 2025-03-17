import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    id: ID!
    src: String!
    alt: String!
    likes: Int!
    isFeatured: Boolean!
  }

  type Action {
    name: String!
    action: String!
  }

  type Schema {
    layout: String!
    columns: Int!
    imageActions: [Action!]!
    images: [Image!]!
  }

  type Query {
    schema: Schema!
  }

  type Mutation {
    addLike(id: ID!): Image
    removeLike(id: ID!): Image
    deleteImage(id: ID!): Boolean
    markFeatured(id: ID!): Image
  }
`;

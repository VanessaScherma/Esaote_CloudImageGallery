import { gql } from "apollo-server";

export const typeDefs = gql`
  type Layout {
    type: String!
    spacing: Int!
    columns: Int!
  }

  type Action {
    name: String!
    icon: String!
    action: String!
    color: String!
  }

  type Image {
    id: ID!
    src: String!
    alt: String!
    likes: Int!
    isFeatured: Boolean!
  }

  type Schema {
    layout: Layout!
    actions: [Action!]!
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

import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages {
    schema {
      layout
      columns
      imageActions {
        name
        action
      }
      images {
        id
        src
        alt
        likes
        isFeatured
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query GetImages {
    schema {
      layout {
        type
        spacing
      }
      actions {
        name
        icon
        action
        color
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

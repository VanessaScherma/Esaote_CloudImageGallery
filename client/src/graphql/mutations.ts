import { gql } from '@apollo/client';

export const ADD_LIKE = gql`
  mutation AddLike($id: ID!) {
    addLike(id: $id) {
      id
      likes
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation RemoveLike($id: ID!) {
    removeLike(id: $id) {
      id
      likes
    }
  }
`;

export const DELETE_IMAGE = gql`
    mutation DeleteImage($id: ID!) {
        deleteImage(id: $id)
    }
`;

export const MARK_FEATURED = gql`
    mutation MarkFeatured($id: ID!) {
        markFeatured(id: $id) {
            id
            isFeatured
        }
    }
`;
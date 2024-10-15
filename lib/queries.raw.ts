import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts($category: String!, $first: Int!, $after: String) {
    posts(where: { categoryName: $category }, first: $first, after: $after) {
      nodes {
        id
        title
        uri
        slug
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const GET_POST = gql`
  query GetPost($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      content
      date
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`

export const GET_CONTENT = gql`
  query GetContent(
    $id: ID!
    $idType: ContentNodeIdTypeEnum!
    $asPreview: Boolean!
  ) {
    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
      ... on NodeWithTitle {
        title
      }
      ... on Page {
        title
        content
      }
      date
    }
  }
`

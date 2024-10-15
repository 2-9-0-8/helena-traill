/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n      query GetLayout {\n        generalSettings {\n          title\n          description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n        footerMenuItems: menuItems(where: { location: FOOTER }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n      }\n    ": types.GetLayoutDocument,
    "\n        query GetCategories {\n          categories {\n            nodes {\n              id\n              name\n              uri\n            }\n          }\n        }\n      ": types.GetCategoriesDocument,
    "\n  query GetPosts($category: String!, $first: Int!, $after: String) {\n    posts(where: { categoryName: $category }, first: $first, after: $after) {\n      nodes {\n        id\n        title\n        uri\n        slug\n        categories {\n          nodes {\n            name\n            slug\n          }\n        }\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n            mediaDetails {\n              width\n              height\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPost($slug: String!) {\n    postBy(slug: $slug) {\n      id\n      title\n      slug\n      content\n      date\n      categories {\n        nodes {\n          name\n          slug\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n          mediaDetails {\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query GetContent(\n    $id: ID!\n    $idType: ContentNodeIdTypeEnum!\n    $asPreview: Boolean!\n  ) {\n    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {\n      ... on NodeWithTitle {\n        title\n      }\n      ... on Page {\n        title\n        content\n      }\n      date\n    }\n  }\n": types.GetContentDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetLayout {\n        generalSettings {\n          title\n          description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n        footerMenuItems: menuItems(where: { location: FOOTER }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetLayout {\n        generalSettings {\n          title\n          description\n        }\n        primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n        footerMenuItems: menuItems(where: { location: FOOTER }) {\n          nodes {\n            id\n            label\n            uri\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query GetCategories {\n          categories {\n            nodes {\n              id\n              name\n              uri\n            }\n          }\n        }\n      "): (typeof documents)["\n        query GetCategories {\n          categories {\n            nodes {\n              id\n              name\n              uri\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts($category: String!, $first: Int!, $after: String) {\n    posts(where: { categoryName: $category }, first: $first, after: $after) {\n      nodes {\n        id\n        title\n        uri\n        slug\n        categories {\n          nodes {\n            name\n            slug\n          }\n        }\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n            mediaDetails {\n              width\n              height\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($category: String!, $first: Int!, $after: String) {\n    posts(where: { categoryName: $category }, first: $first, after: $after) {\n      nodes {\n        id\n        title\n        uri\n        slug\n        categories {\n          nodes {\n            name\n            slug\n          }\n        }\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n            mediaDetails {\n              width\n              height\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPost($slug: String!) {\n    postBy(slug: $slug) {\n      id\n      title\n      slug\n      content\n      date\n      categories {\n        nodes {\n          name\n          slug\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n          mediaDetails {\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPost($slug: String!) {\n    postBy(slug: $slug) {\n      id\n      title\n      slug\n      content\n      date\n      categories {\n        nodes {\n          name\n          slug\n        }\n      }\n      featuredImage {\n        node {\n          sourceUrl\n          altText\n          mediaDetails {\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetContent(\n    $id: ID!\n    $idType: ContentNodeIdTypeEnum!\n    $asPreview: Boolean!\n  ) {\n    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {\n      ... on NodeWithTitle {\n        title\n      }\n      ... on Page {\n        title\n        content\n      }\n      date\n    }\n  }\n"): (typeof documents)["\n  query GetContent(\n    $id: ID!\n    $idType: ContentNodeIdTypeEnum!\n    $asPreview: Boolean!\n  ) {\n    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {\n      ... on NodeWithTitle {\n        title\n      }\n      ... on Page {\n        title\n        content\n      }\n      date\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
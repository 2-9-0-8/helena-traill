import 'server-only'

import { cache } from 'react'

import { getClient } from '@faustwp/experimental-app-router'
import { gql } from '@apollo/client'

import { GET_POSTS, GET_POST, GET_CONTENT } from '#/lib/queries.raw'
import type {
	GetLayoutQuery,
	GetCategoriesQuery,
	GetPostsQuery,
	GetContentQuery,
	GetPostQuery,
} from '#/__generated__/graphql'

export const getLayout = cache(async () => {
	const client = await getClient()

	const { data } = await client.query<GetLayoutQuery>({
		query: gql`
      query GetLayout {
        generalSettings {
          title
          description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
        footerMenuItems: menuItems(where: { location: FOOTER }) {
          nodes {
            id
            label
            uri
          }
        }
      }
    `,
	})

	return data
})

export const getCategories = cache(async () => {
	const client = await getClient()

	const { data } = await client.query<GetCategoriesQuery>({
		query: gql`
        query GetCategories {
          categories {
            nodes {
              id
              name
              uri
            }
          }
        }
      `,
	})

	return data
})

export const getPosts = cache(async (category: string) => {
	const client = await getClient()

	const { data } = await client.query<GetPostsQuery>({
		query: GET_POSTS,
		variables: {
			category,
		},
	})

	return data
})

export const getPost = cache(async (slug: string) => {
	const client = await getClient()

	const { data } = await client.query<GetPostQuery>({
		query: GET_POST,
		variables: {
			slug,
		},
	})

	return data
})

export const getContent = cache(async (id: string, isPreview: boolean) => {
	const client = await getClient()

	const { data } = await client.query<GetContentQuery>({
		query: GET_CONTENT,
		variables: {
			id,
			idType: isPreview ? 'DATABASE_ID' : 'URI',
			asPreview: isPreview,
		},
	})

	return data
})

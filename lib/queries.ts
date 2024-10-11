import { cache } from 'react'

import { getClient } from '@faustwp/experimental-app-router'
import { gql } from '@apollo/client'

import type { GetLayoutQuery, GetCategoriesQuery } from '#/__generated__/graphql'

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
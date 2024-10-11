import Link from 'next/link'
import { redirect } from 'next/navigation'

import { gql } from '@apollo/client'
import { getClient } from '@faustwp/experimental-app-router'

import type { GetPostsQuery } from '#/__generated__/graphql'

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
	const client = await getClient()
	const category = (await params).category

	const { data } = await client.query<GetPostsQuery>({
		query: gql`
			query GetPosts($category: String!) {
				posts(where: { categoryName: $category }) {
					nodes {
						id
						title
						uri
						slug
					}
				}
			}
    `,
		variables: {
      category,
    },
	})

	if (!data?.posts?.nodes.length) throw redirect('/archive/all')

	return (
		<>
			{data?.posts?.nodes.map(p => (
				<li key={p.slug}>
					<Link href={`/${p.slug}`}>{p.title}</Link>
				</li>
			))}
		</>
	)
}

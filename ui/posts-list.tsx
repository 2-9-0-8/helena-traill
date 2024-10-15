'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useSuspenseQuery } from '@apollo/client'
import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { BlockButton } from '#/ui/block-button'
import { GET_POSTS } from '#/lib/queries.raw'

import type { GetPostsQuery } from '#/__generated__/graphql'

const [css, styles, href] = cxx`
  .list {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--space-8x);
    justify-content: center;
  }

  .link {
    display: block;
    position: relative;
    text-decoration: none;

		&[aria-current='page'] {

      &::before {
        color: rgb(var(--white) / 100%);
        content: '•';
        inset-inline-end: calc(100% + var(--space));
        position: absolute;
      }
    } 
  }

  .more {
    display: block;
    margin-inline: auto;
  }
`

const NUMBER_OF_INITIAL_POSTS = 25

export function PostsList({
	category,
	className,
	...rest
}: { category: string } & React.ComponentPropsWithRef<'section'>) {
	const { data, fetchMore } = useSuspenseQuery<GetPostsQuery>(GET_POSTS, {
		variables: { category, first: NUMBER_OF_INITIAL_POSTS, after: null },
	})
	const [isPending, startTransition] = useTransition()

	if (!data?.posts?.nodes.length) {
		return <p>No posts found! Try a different category.</p>
	}

	return (
		<section className={clsx(styles.list, className)} {...rest}>
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 400: 1, 720: 2, 900: 3 }}
				style={{ inlineSize: '100%' }}
			>
				<Masonry gutter="var(--space-4x)" columnsCount={3}>
					{data.posts.nodes.map(({ featuredImage, uri, slug }, idx) => {
						const { sourceUrl, altText, mediaDetails } = featuredImage?.node ?? {}

						if (!sourceUrl) return null

						return (
							<Link key={slug} href={`${uri}`} className={styles.link}>
								<Image
									src={sourceUrl}
									alt={altText ?? ''}
									width={mediaDetails?.width ?? 300}
									height={mediaDetails?.height ?? 300}
									style={{
										blockSize: 'auto',
										display: 'block',
										inlineSize: '100%',
										objectFit: 'contain',
									}}
									priority={idx < 3}
									loading={idx < 3 ? 'eager' : 'lazy'}
									onError={e => {
										console.error(`Failed to load image: ${sourceUrl}`)
										e.currentTarget.srcset = '/assets/no-thumbnail.jpg'
									}}
								/>
							</Link>
						)
					})}
				</Masonry>
			</ResponsiveMasonry>

			{data.posts.pageInfo.hasNextPage && (
				<BlockButton
					onClick={() => {
						startTransition(async () => {
							await fetchMore({
								variables: { after: data.posts?.pageInfo.endCursor },
								updateQuery: (prevResult, { fetchMoreResult }) => {
									if (!fetchMoreResult?.posts) return prevResult

									return {
										...prevResult,
										posts: {
											...prevResult.posts,
											nodes: [...(prevResult.posts?.nodes ?? []), ...fetchMoreResult.posts.nodes],
											pageInfo: fetchMoreResult.posts.pageInfo,
										},
									}
								},
							})
						})
					}}
					aria-disabled={isPending}
				>
					{isPending ? 'Loading more...' : 'Load more'}
				</BlockButton>
			)}

			<style href={href} precedence="medium">
				{css}
			</style>
		</section>
	)
}

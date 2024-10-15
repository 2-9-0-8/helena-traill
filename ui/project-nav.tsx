'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSuspenseQuery } from '@apollo/client'
import { cxx } from '@jk2908/cxx'

import { Scrollable } from '#/ui/scrollable'

import { GET_POSTS } from '#/lib/queries.raw'
import type { GetPostsQuery } from '#/__generated__/graphql'

const [css, styles, href] = cxx`
  .list {
    align-items: center;
    background-color: rgb(var(--neutral-950) / 100%);
    color: rgb(var(--white) / 100%);
    display: flex;
    gap: var(--space-8x);
    justify-content: center;
    list-style-type: none;
    padding-block: var(--space-3x);
    padding-inline: var(--space-3x);
  }

  .link {
    flex-shrink: 0;
    position: relative;
    text-decoration: none;
    white-space: nowrap;

    &[aria-current='page'] {

      &::before {
        color: rgb(var(--white) / 100%);
        content: '•';
        inset-inline-end: calc(100% + var(--space));
        position: absolute;
      }
    } 

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: rgb(var(--white) / 100%);
        text-decoration: underline;
      }
    }
  }
`

const NUMBER_OF_INITIAL_POSTS = 25

export function ProjectNav({
	category,
	...rest
}: { category: string } & React.ComponentPropsWithRef<'div'>) {
	const { data, fetchMore } = useSuspenseQuery<GetPostsQuery>(GET_POSTS, {
		variables: { category, first: NUMBER_OF_INITIAL_POSTS, after: null },
	})

	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()

	if (!data.posts?.nodes.length) return null

	function getMoreProjects() {
		if (isPending) return

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
	}

	return (
		<>
			<Scrollable
				bgColour="rgb(var(--neutral-950) / 100%)"
				scrollbars={{
					thumb: 'rgb(var(--neutral-700) / 100%)',
					track: 'rgb(var(--neutral-950) / 100%)',
					width: 'thin',
				}}
				onScrollChange={el => {
					const { scrollLeft, scrollWidth, clientWidth } = el
					const FETCH_BUFFER = 100

					if (scrollLeft + clientWidth + FETCH_BUFFER >= scrollWidth) {
						getMoreProjects()
					}
				}}
				{...rest}
			>
				<nav>
					<ul className={styles.list}>
						{data.posts.nodes.map(
							({ uri, title, slug }) =>
								uri &&
								slug && (
									<li key={slug} id={slug}>
										<Link
											href={uri}
											className={styles.link}
											aria-current={pathname === `/projects/${slug}` ? 'page' : false}
										>
											{title}
										</Link>
									</li>
								),
						)}
					</ul>
				</nav>
			</Scrollable>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

'use client'

import Link from 'next/link'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import type { GetCategoriesQuery } from '#/__generated__/graphql'

const [css, styles, href] = cxx`
  .nav {
    margin-inline: auto;
  
    > ul {
      display: flex;
      gap: var(--space-8x);
      justify-content: center;
      list-style-type: none;
      margin-inline: auto;
      max-inline-size: 100%;
      overflow-x: auto;
      padding-block-end: var(--space-3x);
      white-space: nowrap;
    }
  }

  .link {
    font-weight: 700;
    text-decoration: none;
  }
`

export function ArchiveNav({
	data,
	className,
	...rest
}: { data: GetCategoriesQuery } & React.ComponentPropsWithRef<'nav'>) {
	const withArchiveData = data.categories?.nodes
		.filter(n => n.name !== 'Uncategorized')
		.map(n => ({ ...n, archive: `/archive/${n.name?.toLowerCase()}` }))

	return (
		<nav className={clsx(styles.nav, className)} {...rest}>
			<ul>
				{withArchiveData?.map(({ archive, name, id }) => (
					<li key={id}>
						<Link href={archive} className={styles.link}>
							{name}
						</Link>
					</li>
				))}
			</ul>

			<style href={href} precedence="medium">
				{css}
			</style>
		</nav>
	)
}

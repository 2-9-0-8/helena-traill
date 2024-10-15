'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { Scrollable } from '#/ui/scrollable'
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
      padding-inline: var(--space-3x);
      white-space: nowrap;
    }
  }

  .link {
    font-weight: 700;
    position: relative;
    text-decoration: none;

    &[aria-current='page'] {

      &::before {
        color: rgb(var(--primary) / 100%);
        content: '•';
        inset-inline-end: calc(100% + var(--space));
        position: absolute;
      }
    } 
  }
`

export function ArchiveNav({
	data,
	className,
	...rest
}: { data: GetCategoriesQuery } & React.ComponentPropsWithRef<'div'>) {
	const pathname = usePathname()
	const withArchiveLink = data.categories?.nodes
		.filter(n => n.name !== 'Uncategorized')
		.map(n => ({ ...n, archiveLink: `/archive/${n.name?.toLowerCase()}` }))

	return (
		<>
			<Scrollable bgColour="rgb(var(--app-bg) / 100%)" {...rest}>
				<nav className={clsx(styles.nav, className)}>
					<ul>
						{withArchiveLink?.map(({ archiveLink, name, id }) => (
							<li key={id}>
								<Link
									href={archiveLink}
									className={styles.link}
									aria-current={pathname === archiveLink ? 'page' : false}
								>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</Scrollable>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

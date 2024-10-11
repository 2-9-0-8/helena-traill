import Link from 'next/link'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { getLayout } from '#/lib/queries'

const [css, styles, href] = cxx`
  .nav {
    > ul {
      display: flex;
      gap: var(--space-5x);
      list-style-type: none;
    }
  }

  .link {
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
  }
`

export async function Nav({ className, ...rest }: React.ComponentPropsWithRef<'nav'>) {
	const { primaryMenuItems } = await getLayout()

	return (
		<nav className={clsx(styles.nav, className)} {...rest}>
			<ul>
				{primaryMenuItems?.nodes.map(
					({ uri, label, id }) =>
						uri &&
						label && (
							<li key={id}>
								<Link href={uri} className={styles.link}>{label}</Link>
							</li>
						),
				)}
			</ul>

      <style href={href} precedence="medium">
        {css}
      </style>
		</nav>
	)
}

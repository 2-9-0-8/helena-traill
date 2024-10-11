import Link from 'next/link'

import { cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

import { Logo } from '#/ui/logo'
import { Nav } from '#/ui/nav'

const [css, styles, href] = cxx`
  .header {
    --cols: 2;

    align-items: center;
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    padding-block: var(--space-5x);

    @media (width >= 1024px) {
      --cols: 3;
    }
  }

  .logo {
    block-size: 4.6rem;
    grid-column: 1;
    inline-size: 7.813rem;

    @media (width >= 1024px) {
      grid-column: 2;
      margin-inline: auto;
    }
  }

  .nav {
    grid-column: 3;
    justify-self: end;
  }
`

export function Header({ className, ...rest }: React.ComponentPropsWithRef<'header'>) {
	return (
		<header className={clsx(styles.header, className)} {...rest}>
			<Link href="/" className={styles.logo}>
				<Logo />
			</Link>

			<Nav className={styles.nav} />

			<style href={href} precedence="medium">
				{css}
			</style>
		</header>
	)
}

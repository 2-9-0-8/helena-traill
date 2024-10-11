import Link from 'next/link'

import { cxx } from '@jk2908/cxx'

import { Title } from '#/ui/title'
import { BlockButton } from '#/ui/block-button'
import { Icon } from '#/ui/icon'

import { DESCRIPTION } from '#/lib/config'

const [css, styles, href] = cxx`
	.welcome {
		display: flex;
		flex-direction: column;
		gap: var(--space-12x);

		@media (width >= 720px) {
			gap: var(--space-16x);
		}
	}

	.intro {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-inline: auto;
		max-inline-size: 50ch;
		text-align: center;
		text-wrap: balance;

		@media (width >= 720px) {
			font-size: var(--text-3xl);
		}
	}

	.cta {
		margin-inline: auto;
	}
`

export default async function Page() {
	return (
		<>
			<Title prefix="Home" />
			<h1 className="sr-only">Home</h1>

			<div className={styles.welcome}>
				<p className={styles.intro}>{`Hi 👋 ${DESCRIPTION}.`}</p>

				<BlockButton as={Link} href="/archive/all" className={styles.cta}>
					View my work <Icon name="arrow-right" title="Go" size={20} />
				</BlockButton>
			</div>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

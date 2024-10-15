import Link from 'next/link'

import { cxx } from '@jk2908/cxx'

import { Title } from '#/ui/title'
import { BlockButton } from '#/ui/block-button'
import { Icon } from '#/ui/icon'

import { DESCRIPTION } from '#/lib/config'

import { getContent } from '#/lib/queries.server'

const [css, styles, href] = cxx`
	.welcome {
		animation: fade-in 1s ease-out forwards 1 1s;
		display: flex;
		flex-direction: column;
		gap: var(--space-12x);
		opacity: 0;

		@media (width >= 720px) {
			gap: var(--space-16x);
		}

		.intro, :global(.wp-block-heading) {
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

		.cta, :global(.btn) {
			margin-inline: auto;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
`

function FallbackPage() {
	return (
		<div className={styles.welcome}>
			<p className={styles.intro}>{`Hi 👋 ${DESCRIPTION}.`}</p>

			<BlockButton as={Link} href="/archive/all" className={styles.cta}>
				View my work <Icon name="arrow-right" title="Go" size={20} />
			</BlockButton>
		</div>
	)
}

export default async function Page() {
	const { contentNode } = await getContent('home', false)

	return (
		<>
			<Title prefix={contentNode?.title ?? 'Home'} />

			{contentNode && contentNode?.__typename === 'Page' ? (
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: don't be shook
					dangerouslySetInnerHTML={{ __html: contentNode?.content ?? '' }}
					className={styles.welcome}
				/>
			) : (
				<FallbackPage />
			)}

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

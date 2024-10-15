import { notFound } from 'next/navigation'
import Image from 'next/image'

import { cxx } from '@jk2908/cxx'

import { Title } from '#/ui/title'

import { getPost } from '#/lib/queries.server'

const [css, styles, href] = cxx`
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-4x);

		@media (width >= 720px) {
			align-items: center;
			flex-direction: row;
			gap: var(--space-6x);
		}

		> * {
			flex-basis: 50%;
			flex-shrink: 0;
		}
	}

	.holder {
		flex: 1 1;
		position: relative;
	}

	.content {

		h1 {
			font-size: var(--text-xl);
			font-weight: 700;
			margin-block-end: var(--space-4x);

			@media (width >= 720px) {
				font-size: var(--text-3xl);
			}
		}

		p + p {
			margin-block-start: var(--space-4x);
		}
	}
`

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { postBy } = await getPost((await params).id)

	if (!postBy) notFound()

	return (
		<>
			<Title prefix={postBy.title ?? '🤔'} />

			<section className={styles.page}>
				{postBy.featuredImage?.node?.sourceUrl && (
					<div className={styles.holder}>
						<Image
							src={postBy.featuredImage?.node?.sourceUrl}
							alt={postBy.title ?? ''}
							width={postBy.featuredImage?.node?.mediaDetails?.width ?? 300}
							height={postBy.featuredImage?.node?.mediaDetails?.height ?? 200}
							style={{
								blockSize: 'auto',
								display: 'block',
								inlineSize: '100%',
								maxInlineSize: '100%',
								objectFit: 'contain',
							}}
							priority
						/>
					</div>
				)}

				<div className={styles.content}>
					<h1>{postBy.title}</h1>

					<div
						// biome-ignore lint/security/noDangerouslySetInnerHtml: don't be shook
						dangerouslySetInnerHTML={{ __html: postBy.content ?? '' }}
					/>
				</div>
			</section>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

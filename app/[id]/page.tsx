import { notFound, redirect } from 'next/navigation'

import { cxx } from '@jk2908/cxx'

import { Title } from '#/ui/title'

import { getContent } from '#/lib/queries.server'

const [css, styles, href] = cxx`
  .page {

    :global(.wp-block-heading) {
      margin-block-end: var(--space-4x);
    }

    :global(.wp-block-image) img {
      block-size: auto;
      max-inline-size: 100%;
      margin-block-end: var(--space-4x);
    }

    p + p {
      margin-block-start: var(--space-4x);
    }

    :is(h2, h3, h4, h5, h6) + p {
      margin-block-start: var(--space-2x);
    }
  }
`

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { contentNode } = await getContent((await params).id, false)

	if (!contentNode) notFound()
	if (contentNode.__typename !== 'Page') throw redirect('/')

	return (
		<>
      <Title prefix={contentNode?.title ?? '🤔'} />

			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: don't be shook
				dangerouslySetInnerHTML={{ __html: contentNode?.content ?? '' }}
				className={styles.page}
			/>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

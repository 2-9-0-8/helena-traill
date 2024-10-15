import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { ErrorBoundary } from 'react-error-boundary'

import { PostsList } from '#/ui/posts-list'
import { Title } from '#/ui/title'

import { capitalise } from '#/lib/utils'
import { isValidCategory } from '#/lib/utils.server'

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
	const category = (await params).category

	if (!(await isValidCategory(category))) notFound()

	return (
		<>
			<Title prefix={capitalise(category)} />

			<ErrorBoundary
				fallback={<p style={{ textAlign: 'center' }}>Failed to load {category} posts</p>}
			>
				<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading archive...</p>}>
					<PostsList category={category} />
				</Suspense>
			</ErrorBoundary>
		</>
	)
}

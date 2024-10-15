import { ArchiveNav } from '#/ui/archive-nav'

import { getCategories } from '#/lib/queries.server'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const data = await getCategories()

	return (
		<>
			<ArchiveNav data={data} style={{ marginBlockEnd: 'var(--space-8x)' }} />

			{children}
		</>
	)
}

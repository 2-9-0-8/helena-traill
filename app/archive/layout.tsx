import { ArchiveNav } from '#/ui/archive-nav'
import { Scrollable } from '#/ui/scrollable'

import { getCategories } from '#/lib/queries'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await getCategories()

  return (
    <>
      <Scrollable style={{ marginBlockEnd: 'var(--space-10x)' }}>
        <ArchiveNav data={data} />
      </Scrollable>

      {children}
    </>
  )
}
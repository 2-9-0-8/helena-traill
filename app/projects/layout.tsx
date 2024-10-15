import { Suspense } from 'react'

import { cxx } from '@jk2908/cxx'
import { ErrorBoundary } from 'react-error-boundary'

import { ProjectNav } from '#/ui/project-nav'

const [css, styles, href] = cxx`
	.nav {
		border-image: conic-gradient(rgb(var(--neutral-950) / 100%) 0 0) fill 1//0 50vi;
		margin-block-start: var(--space-10x);

    @media (width >= 720px) {
    	margin-block-start: var(--space-12x);
    }
	}
`

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}

			<ErrorBoundary fallback={<p style={{ textAlign: 'center' }}>Failed to load project nav</p>}>
				<Suspense fallback={null}>
					<ProjectNav category="all" className={styles.nav} />
				</Suspense>
			</ErrorBoundary>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}

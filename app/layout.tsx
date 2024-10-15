import type { Metadata } from 'next'

import { ErrorBoundary } from 'react-error-boundary'

import { Providers } from '#/ui/providers'
import { Header } from '#/ui/header'
import { Wrapper } from '#/ui/wrapper'
import { Footer } from '#/ui/footer'

import { DESCRIPTION } from '#/lib/config'

import '#/app/styles.css'

export const metadata: Metadata = {
	description: DESCRIPTION,
	icons: [{ url: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Wrapper>
						<Header />
					</Wrapper>

					<main>
						<ErrorBoundary
							fallback={
								<p>We're having trouble showing this page at the moment. Please try again later.</p>
							}
						>
							<Wrapper>{children}</Wrapper>
						</ErrorBoundary>
					</main>

					<Wrapper>
						<Footer />
					</Wrapper>
				</Providers>
			</body>
		</html>
	)
}

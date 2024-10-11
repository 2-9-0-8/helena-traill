import type { Metadata } from 'next'

import { Providers } from '#/ui/providers'
import { Header } from '#/ui/header'
import { Wrapper } from '#/ui/wrapper'
import { Footer } from '#/ui/footer' 

import { DESCRIPTION } from '#/lib/config'

import '#/app/styles.css'

export const metadata: Metadata = {
	description: DESCRIPTION,
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
						<Wrapper>
							{children}
						</Wrapper>
					</main>

					<Wrapper>
						<Footer />
					</Wrapper>
				</Providers>
			</body>
		</html>
	)
}

import { getLayout } from '#/lib/queries'
import { NAME } from '#/lib/config'

export async function Title({ prefix }: { prefix: string }) {
	const { generalSettings } = await getLayout()

	return <title>{`${prefix} - ${generalSettings?.title ?? NAME}`}</title>
}
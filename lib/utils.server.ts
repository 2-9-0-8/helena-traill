import 'server-only'

import { getCategories } from './queries.server'

export const isValidCategory = async (cat: string) =>
	(await getCategories())?.categories?.nodes.some(
		category => category.name?.toLowerCase() === cat.toLowerCase(),
	)

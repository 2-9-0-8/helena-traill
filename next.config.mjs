import { withCxx } from '@jk2908/cxx/next'

const config = {
	reactStrictMode: true,
	experimental: {
		ppr: 'incremental',
		reactCompiler: true,
	},
}

export default withCxx(config)

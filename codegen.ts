import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'https://hd.2908.app/graphql',
	documents: ['app/**/*.{tsx,ts}', 'lib/**/*.{ts,tsx}'],
	generates: {
		'./__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
}

export default config

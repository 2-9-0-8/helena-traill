import type { NextConfig } from 'next'

import { withCxx } from '@jk2908/cxx/next'

const config = {
	reactStrictMode: true,
	experimental: {
		ppr: 'incremental',
		reactCompiler: true,
		dynamicIO: true,
	},
	images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN ?? ''],
    formats: ['image/avif', 'image/webp']
  },
} satisfies NextConfig
 
export default withCxx(config)

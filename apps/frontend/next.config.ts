import type { NextConfig } from 'next'
import path from 'path'

const config: NextConfig = {
  	images: {
		unoptimized: true,
    	remotePatterns: [
			{			
                protocol: 'https',
                hostname: 'img.logo.dev',
                port: '',
                pathname: '/**',
            }
    	],
  	},
  	turbopack: {
    	root: path.resolve(__dirname, '..', '..'),
  	},
}
 
export default config

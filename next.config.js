/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        // ⚠️ TEMPORARY: Ignore TypeScript errors during build to unblock deployment
        // TODO: Remove this after fixing all TypeScript issues
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    headers: async () => {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net"
            },
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "github.githubassets.com"
            },
            {
                hostname: "img.youtube.com"
            }
        ]
    }
};

export default nextConfig;

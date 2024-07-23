/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://669972c62069c438cd7251e5.mockapi.io",
    //API_URL: "https://669972c62069c438cd7251e5.mockapi.io/api/heroes",
    DOMAIN_ORIGIN: "http://localhost:3000",
  },
};

export default nextConfig;

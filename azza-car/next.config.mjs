/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
  ],
  reactStrictMode: true,
};

export default nextConfig;

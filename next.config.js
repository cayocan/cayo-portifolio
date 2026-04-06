/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const basePath = isGitHubActions ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

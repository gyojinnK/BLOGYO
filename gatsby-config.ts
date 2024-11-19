import type { GatsbyConfig } from 'gatsby'
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const SITE_URL = `https://blogyo.vercel.app`

const config: GatsbyConfig = {
  siteMetadata: {
    title: `BLOGYO - gyojinnk's blog`,
    description: `gyojinnk의 개발 블로그. 성장하는 개발자가 되기 위해 공부한 내용을 정리하고 공유합니다.`,
    siteUrl: SITE_URL,
  },
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
}

export default config

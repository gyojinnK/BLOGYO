import type { GatsbyConfig } from 'gatsby'
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from './config'
import dotenv from 'dotenv'

dotenv.config({
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon/favicon-16x16.png',
        icons: [
          {
            src: '/favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/favicon/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png',
          },
          {
            src: '/favicon/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/favicon/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/favicon/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-57x57.png',
            sizes: '57x57',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-114x114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/favicon/ms-icon-70x70.png',
            sizes: '70x70',
            type: 'image/png',
          },
          {
            src: '/favicon/ms-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/favicon/ms-icon-150x150.png',
            sizes: '150x150',
            type: 'image/png',
          },
          {
            src: '/favicon/ms-icon-310x310.png',
            sizes: '310x310',
            type: 'image/png',
          },
        ],
      },
    },
  ],
}

export default config

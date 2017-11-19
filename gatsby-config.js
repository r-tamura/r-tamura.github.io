module.exports = {
  siteMetadata: {
    title: `技術メモR`,
    description: 'r-tamura\'s Tech Blog',
    siteUrl: `https://rtam.xyz`,
    authorName: `r-tamura`,
    authorDetail: `Web関連多めのソフトウェアエンジニアです。`,
    googleAnalyticsId: `UA-98640169-1`,
    syntaxTheme: `ocean`,
    twitterId: `r_tamura30`,
    facebookId: ``,
    githubId: `r-tamura`,
    copyright: 2017,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-prismjs`,
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      }
    },
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          require(`postcss-import`)(),
          /* cssnextから各プラグインを導入する形式に変更する可能性あり */
          require(`postcss-cssnext`)(),
          require(`postcss-apply`)
        ],
        // precision: 8 // SASS default: 5
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `R's Tech`,
        short_name: `r-tamura's tech blog`,
        start_url: `/?launcher=true`,
        background_color: `#FDFDFD`,
        theme_color: `#FDFDFD`,
        display: `standalone`,
        icons: [
          {
            src: `/favicons/fox_48x48.png`,
            type: `image/png`,
            sizes: `48x48`
          },
          {
            src: `/favicons/fox_144x144.png`,
            type: `image/png`,
            sizes: `144x144`
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-98640169-1',
      },      
    },
    {
      resolve: `gatsby-plugin-feed`,      
    },
  ],
}

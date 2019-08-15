module.exports = {
  pathPrefix: `gatsby-geocoding`,
  siteMetadata: {
    title: `Geocoding data with Gatsby`,
    description: `Demonstrating how to geocode data within Gatsby to display it on a map`,
    author: `@andrewl`,
  },
  plugins: [
    `gatsby-plugin-react-leaflet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-opencage-geocoder`,
      options: {
        api_key: `YOUR-API-KEY-HERE`,
        nodeTypes: [
          {
            nodeType: `EpraccurCsv`,
            addressFields: [`field5`,`field6`,`field7`,`field8`,`field9`,`field10`],
          },
        ]
      }
    },
    { 
      resolve: `gatsby-transformer-csv`,
      options: {
        noheader: true,
      },
    },
  ],
}

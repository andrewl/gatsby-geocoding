const path = require(`path`)

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const surgeryTemplate = path.resolve(`src/templates/surgery.js`)
    // Query for recipe nodes to use in creating pages.
    resolve(
      graphql(
        `
          query MyQuery {
            allEpraccurCsv {
              edges {
                node {
                  field1
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each article.
        result.data.allEpraccurCsv.edges.forEach(({ node }) => {
          createPage({
            path: "/surgery/" + node.field1,
            component: surgeryTemplate,
            context: {
              id: node.field1,
            },
          })
        })
      })
    )
  })
}

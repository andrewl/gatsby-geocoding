import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const allSurgerys = data.allEpraccurCsv.edges.map(edge => edge.node)

  return (
    <Layout>
      <p>
        Click on the name of a GP Surgery below for more information and to see
        it's location on a map
      </p>
      <ul>
        {allSurgerys.map(surgery => (
          <li>
            <Link to={`surgery/${surgery.field1}`}>{surgery.field2}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allEpraccurCsv {
      edges {
        node {
          field1
          field2
          field4
        }
      }
    }
  }
`

export default IndexPage

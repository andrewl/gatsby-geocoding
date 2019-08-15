import { graphql } from "gatsby"
import React from "react"
import Layout from '../components/layout'
import LeafletMap from '../components/leafletmap'

const SurgeryTemplate = ({ data }) => {
  let surgery = data.allEpraccurCsv.edges[0].node;
  let position = null
  if (surgery.fields !== null) {
    position = [surgery.fields.geocoderGeometry.lat, surgery.fields.geocoderGeometry.lng];
  }
  let address = [surgery.field5, surgery.field6, surgery.field7, surgery.field8, surgery.field9, surgery.field10].filter(function(el) { return el !== "" }).join(", ");
  return (
    <Layout>
    <h2>{surgery.field2}</h2>
    <p>{address}</p>
    {typeof window !== 'undefined' && position &&
        <LeafletMap
          position={position}
          zoom={12}
          markerText={surgery.field2}
        />
    }
  </Layout>
  );
}

export default SurgeryTemplate;

export const query = graphql`

query($id: String!) {
  allEpraccurCsv(filter: {field1: {eq: $id}}) {
    edges {
      node {
        field1
        field2
        field5
        field6
        field7
        field8
        field9
        field10
        fields {
          geocoderGeometry {
            lat
            lng
          }
        }
      }
    }
  }
}
`

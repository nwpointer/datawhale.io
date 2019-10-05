import React from "react"
import Layout from "../components/layout"
import ArticleExcerpt from "../components/articleExcerpt";
import { Helmet } from "react-helmet"
import { Container, Row, Col } from 'react-grid-system';

export default ({data}) => {
  const articles = data.allMarkdownRemark.nodes;
  return(
    <Layout>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Blog - Nathan Pointer</title>
          <link rel="canonical" href="http://nathanpointer.com/blog" />
      </Helmet>
      <Container className="container">
        <Row>
          <Col className="simpleArticleList">
            <h2>All posts:</h2>
            <br /> 
            { articles.map(ArticleExcerpt) }
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (sort: { fields: [frontmatter___date], order: DESC }){
      nodes {
        html
        excerpt( pruneLength: 120 )
        frontmatter {
          month:date(formatString: "MMM")
          year:date(formatString: "YYYY")
          day:date(formatString: "DD")
          date
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

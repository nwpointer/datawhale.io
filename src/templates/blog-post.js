import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet";
import { DiscussionEmbed } from "disqus-react";
import { rhythm, scale } from "../utils/typography";
import { Container, Row, Col } from 'react-grid-system';

export default ({ data }) => {
  const post = data.markdownRemark
    const disqusShortname = "http-nathanpointer-com";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };
  return (
    <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{post.frontmatter.title}</title>
            <link rel="canonical" href="http://nathanpointer.com/blog" />
        </Helmet>
        <Container style={{'padding-bottom': rhythm(2)}}>
          <Row align="center">
            <Col>
              <h1 style={{...scale(1), borderBottom: '0px', marginBottom: rhythm(0.25)}}>{post.frontmatter.title}</h1>
              <hr />
              <div className="meta" style={{
                marginBottom: rhythm(1.5),
                ...scale(-0.25)
              }}> 
                {post.frontmatter.date} | ~{post.fields.readingTime.text}
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </Col>
          </Row>
        </Container>
        <section style={{background: 'rgba(0,0,0,0.05)', padding: rhythm(1)}}>
          <Container style={{'padding-right': rhythm(1), 'padding-left': rhythm(1)}}>
            <Row>
                <Col>
                  <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </Col>
            </Row>
          </Container>
        </section>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    site { siteMetadata { title } }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
      }
      fields {
          slug
          readingTime {
            text
          }
      }
    }
  }
`
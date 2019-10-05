import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography";
import { Container, Row, Col } from 'react-grid-system';

export default ({ children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Datawhale.io</title>
                <link rel="canonical" href="https://datawhale.io" />
            </Helmet>
            <br />
            <Header />
            <br />
            {children}
            <Footer />
        </div>
  )
}

const Header = () => (
    <header>
        <Container>
            <Row align="center">
                <Col>
                    <Link to="/">
                        {/* <div className="name">Datawhale.io</div> */}
                        <img class="logo" src="/logo.png" alt="datawhale.io"/>
                    </Link>
                </Col>
                <Col xs="content">
                    <Link to="/blog">pricing</Link>
                </Col>
                <Col xs="content">
                    <a href="mailto:nwpointer@gmail.com">contact</a>
                </Col>
            </Row>
        </Container>
    </header>
)

const Footer = () => (
    <footer>
        <Container>
            <Row align="end">
                <Col style={{lineHeight: rhythm(2), margin:'auto'}}>
                <small>
                    © 2019 Datawhale, Inc - All rights reserved.
                </small>
                </Col>
            </Row>
        </Container>
    </footer>
)
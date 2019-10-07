import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography";
import { Container, Row, Col } from 'react-grid-system';
import * as Scroll from 'react-scroll';
import Drift from 'react-driftjs'

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
                <meta name='viewport' content='width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no, initial-scale=1' />
            </Helmet>
            <br />
            <Header />
            <br />
            {children}
            <Footer />
            <Drift appId="mgykahhfn65n" />
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
                        <img className="logo" src="/logo.png" alt="datawhale.io"/>
                    </Link>
                </Col>
                <Col className="link" xs="content">
                    <Scroll.Link to="test1" smooth='easeInOutQuart' duration={500}>Contact</Scroll.Link>
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
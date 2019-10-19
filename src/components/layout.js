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
                <script src="/drift.js"></script>
                <script>
                    {`
                         "use strict";

                         !function() {
                         var t = window.driftt = window.drift = window.driftt || [];
                         if (!t.init) {
                             if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
                             t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
                             t.factory = function(e) {
                             return function() {
                                 var n = Array.prototype.slice.call(arguments);
                                 return n.unshift(e), t.push(n), t;
                             };
                             }, t.methods.forEach(function(e) {
                             t[e] = t.factory(e);
                             }), t.load = function(t) {
                             var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
                             o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
                             var i = document.getElementsByTagName("script")[0];
                             i.parentNode.insertBefore(o, i);
                             };
                         }
                         }();
                         drift.SNIPPET_VERSION = '0.3.1';
                         drift.load('mgykahhfn65n');
                    `}
                </script>

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
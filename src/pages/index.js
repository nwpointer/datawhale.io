import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { scale, rhythm } from "../utils/typography";
import * as Scroll from 'react-scroll';

const Hero = (screenClass)=>{
  const padding = {xs: 2, sm:1, md:2, lg:4, xl:4};
  const headingScale = {xs: 1, sm:1, md:1, lg:1.5, xl:1.5};
  const headingWidth = {xs: '100%', sm:'100%', md:'90%', lg:'90%', xl:'90%'}
  const subheadingScale = {xs: 0.5, sm:0.75, md:0.75, lg:1, xl:1};
  return (
    <Row class="hero" style={{ paddingTop: rhythm(padding[screenClass]), paddingBottom: rhythm(padding[screenClass]+2)}}>
      <Col lg={6}>
        <h1 style={{maxWidth: headingWidth[screenClass], ...scale(headingScale[screenClass])}}>
          <b>Powerful data to reach everyone in your target market</b>
        </h1>
        <h2 style={{...scale(subheadingScale[screenClass])}}>
        <p>Datawhale builds custom datasets containing key information on customers in your target market. Deeply understand your customers, identify future prospects, and personalize every single marketing and sales interaction.</p>
        </h2>
        <button class="excitable z1"><b>BUY DATA</b></button>
      </Col>
      <Col lg={6} style={{display: 'flex', 'justifyContent': 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', paddingTop: rhythm(screenClass == 'xs' || screenClass == 'sm' ? 2: 1)}}>
        </div>
      </Col>
    </Row>
  )
}

const Services = ()=>{
  return (
    <Row style={{marginBottom: '3em'}}>
      <Col class="growable" md={6}>
        <div class="circle growable invert z1"></div>
        <h3>Marketing Datasets</h3>
        <p>Reach your entire target audience and build campaigns that generate better results.</p>
      </Col>
      <Col class="growable" md={6}>
        <div class="circle growable invert z1"></div>
        <h3>Sales Datasets</h3>
        <p>Discover valuable information on future prospects and personalize every interaction.</p>
      </Col>
    </Row>
  )
}

const PressLogos = () =>{
  return (
    <div class="pressLogos borderTop borderBottom">
      <Row class="pressLogosPrimary">
        <Col class="verticalCenter" ><img class="pressLogo" src="/logos/0.png" alt="/"/></Col>
        <Col class="verticalCenter" ><img class="pressLogo" src="/logos/1.png" alt="/"/></Col>
        <Col class="verticalCenter" ><img class="pressLogo" src="/logos/2.png" alt="/"/></Col>
        <Col class="verticalCenter" ><img class="pressLogo" src="/logos/3.png" alt="/"/></Col>
      </Row>
      <div className="pressLogosSecondary">
        <button><b>BUY DATA</b></button>
      </div>
    </div>
  )
}

const SecondaryHero = ()=> {
  return (
    <div style={{margin:'8em 0em'}}>
      <div className="horizontalCenter">
        <div class="circle growable invert z1"></div> 
      </div>
      <div className="horizontalCenter textCenter">
        <div>
          <h1 class="thin">Data Points</h1>
          <p>A dataset of resume, contact, social, and demographic information on 1.5 Billion unique individuals, delivered to you at the scale you need it. Over 1 Billion personal email addresses, 420 Million LinkedIn URLs, 1 Billion Facebook URLs/IDs, and much more.</p>
        </div>
      </div>
    </div>
  )
}

const ContactUs = () => {
  return(
    <Scroll.Element name="test1">
      <div className="contact_us" style={{background: '#484265', display:'flex', position:'relative'}}>
        <div className="overlay"></div>
        <Container >
          <Row >
            <Col lg={6} style={{color:"white", display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <h1>See why the world’s best companies use Datawhale to become truly data-driven.</h1>
              <p>Join hundreds of companies using Datawhale.</p>
              <img width="60px" style={{marginLeft:'80px'}} src="https://www.pngkey.com/png/full/43-430893_white-curved-arrow-png-darkness.png" alt=""/>
              <br/>
              <br/>
            </Col>
            <Col lg={6} class="horizontalCenter">
              <div className="formCard">
                <br />
                <div className="horizontalCenter">
                  <div class="circle growable invert">🚀</div> 
                </div>
                <h2 class="textCenter">Get started</h2>
                <br />
                <form>
                  <label class="fill" htmlFor="email">Email:</label>
                  <input class="fill" name="email" type="text" placeholder="email@mail.com"/>
                  <label class="fill" htmlFor="message">Message:</label>
                  <textArea class="fill" name="message" type="text" placeholder="what are you trying to accomplish with datawhale"/>
                  <button class="fill">Request Demo</button>
                </form>
                <br />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
    </Scroll.Element>
  )
}

export default ({data}) => {
  const articles = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <Container >
        <ScreenClassRender render={Hero} />
        <Services/>
        <PressLogos />
        <SecondaryHero />
      </Container>
      <ContactUs />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (sort: { fields: [frontmatter___date], order: DESC }, limit:3){
      nodes {
        html
        excerpt( pruneLength: 120 )
        frontmatter {
          month:date(formatString: "MMMM")
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

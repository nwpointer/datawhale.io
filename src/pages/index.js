import React, { useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import ContactUs from "../components/contact"
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { scale, rhythm } from "../utils/typography";
import * as Scroll from 'react-scroll';
import faker from 'faker';


const Hero = (screenClass)=>{
  const padding = {xs: 1, sm:1, md:2, lg:4, xl:4};
  const headingScale = {xs: 1, sm:1, md:1, lg:1.5, xl:1.5};
  const headingWidth = {xs: '100%', sm:'100%', md:'90%', lg:'90%', xl:'90%'}
  const subheadingScale = {xs: 0.5, sm:0.75, md:0.75, lg:1, xl:1};
  return (
    <Row className="hero" style={{ paddingTop: rhythm(padding[screenClass]), paddingBottom: rhythm(padding[screenClass]+2)}}>
      <Col lg={6}>
        <h1 style={{maxWidth: headingWidth[screenClass], ...scale(headingScale[screenClass])}}>
          <b>Customer intelligence drives radically better business</b>
        </h1>
        <h2 style={{...scale(subheadingScale[screenClass])}}>
        <p>Unlock innovation with the most accurate work, contact, and social data on every person in your target market.</p>
        </h2>
        <Scroll.Link to="test1" smooth='easeInOutQuart' duration={500}>
          <button className="excitable z1"><b>BUY DATA</b></button>
        </Scroll.Link>
        <Link to="/data" activeClassName="active">
          <button style={{marginLeft:'1em'}} className="excitable z1 secondary"><b>PREVIEW DATASET</b></button>
        </Link>
      </Col>
      <Col lg={6} style={{display: 'flex', 'justifyContent': 'center', alignItems: 'center'}}>
        <div className="dark" style={{display: 'flex', paddingTop: rhythm(screenClass == 'xs' || screenClass == 'sm' ? 2: 1)}}>
         <div style={{position:'relative', top: '40px'}}>
          <DemoTable />
          <DemoTable />
          <DemoTable />
          <DemoTable />
         </div>
        </div>
      </Col>
    </Row>
  )
}

const DemoTable = () => {
  return (
    <div className="data-wrapper">
      {/* <h2>Prospects</h2> */}
      <table className="data">
        <thead>
          <tr>
            <td style={{opacity:0, width:'32px'}}>a</td>
            <td className="data-name">name</td>
            <td>email</td>
            <td>company</td>
            <td>role</td>
            <td>location</td>
            <td>linkedin</td>
          </tr>
        </thead>
        <tbody>
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </tbody>
      </table>
    </div>
  )
}

const Profile = () => {
  const card = faker.helpers.createCard();
  return (
    <tr>
      <td><img src={faker.image.avatar()} /></td>
      <td className="data-name">{card.name}</td>
      <td>{card.email}</td>
      <td>{card.company.name}</td>
      <td>{faker.name.title()}</td>
      <td>{card.address.city}</td>
      <td>linkedin.com/{card.username}</td>
    </tr>
  )
}

const Services = ()=>{
  return (
    <Row style={{marginBottom: '3em'}}>
      <Col className="growable" md={6}>
        <div className="circle growable invert z1 md">
          <i className="icon icofont-paper-plane"></i>
        </div>
        <h3>Datasets for marketers</h3>
        <p>Reach your entire target audience and build campaigns that generate better results.</p>
      </Col>
      <Col className="growable" md={6}>
        <div className="circle growable invert z1 md blue">
          <i className="icon icofont-binoculars"></i>
        </div>
        <h3>Datasets for sales</h3>
        <p>Discover valuable information on future prospects and personalize every interaction.</p>
      </Col>
    </Row>
  )
}

const PressLogos = () =>{
  return (
    <div className="pressLogos borderTop borderBottom">
      <Row className="pressLogosPrimary">
        <Col className="verticalCenter" ><img className="pressLogo" src="/logos/0.png" alt="/"/></Col>
        <Col className="verticalCenter" ><img className="pressLogo" src="/logos/1.png" alt="/"/></Col>
        <Col className="verticalCenter" ><img className="pressLogo" src="/logos/2.png" alt="/"/></Col>
        <Col className="verticalCenter" ><img className="pressLogo" src="/logos/3.png" alt="/"/></Col>
      </Row>
      <div className="pressLogosSecondary">
        <Scroll.Link to="test1" smooth='easeInOutQuart' duration={500}>
        <button><b>BUY DATA</b></button>
        </Scroll.Link>
      </div>
    </div>
  )
}

const SecondaryHero = ()=> {
  return (
    <div style={{margin:'8em 0em'}}>
      <div className="horizontalCenter">
        <div className="circle growable invert z1 md">
          <i className="icon icofont-site-map"></i>  
        </div> 
      </div>
      <div className="horizontalCenter textCenter">
        <div>
          <h1 className="thin">Data Points</h1>
          <p>Trusted information on 1.5 Billion consumers to deeply understand your customers and drive every single marketing and sales interaction.</p>
          <br/>
        </div>
      </div>
      <Row>
        <Col md={6} className="datapoints">
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', minHeight:'350px'}}>
          <div style={{display:'flex', position:'relative', height:'300px', width:'300px', alignItems:'center', justifyContent:'center', height:'100%'}}>
            <div style={{position:'absolute'}}className="empty-circle"></div>
            <img className="colorize" style={{position:'absolute', width:'200px'}} src="./halftone.png" alt=""/>
            <img style={{position:'absolute', width:'40px'}} src="./logoicon.png" alt=""/>
            <div style={{position:'absolute', transform:'scale(0.97)', opacity: 0.4}}className="empty-circle"></div>
            <div style={{position:'absolute', transform:'scale(0.94)', opacity: 0.2}}className="empty-circle"></div>
            <div className="nspin" style={{position:'absolute', width:'300px', height:'300px'}}>
              <div className="circle spin growable blue invert z1 sm" style={{right:'-70px'}}>
                <div className="spin"><i className="icon icofont-linkedin"></i></div>
              </div>
              <div className="circle growable invert z1 sm" style={{top:'50px'}}>
                <div className="spin"><i className="icon icofont-at"></i></div>
              </div>
              <div className="circle growable blue invert z1 sm" style={{top:'210px',right:'-90px'}}>
                <div className="spin"><i className="icon icofont-ui-user"></i></div>
              </div>
              <div className="circle growable invert z1 sm" style={{top:'100px',right:'-270px'}}>
                <div className="spin"><i className="icon icofont-facebook"></i></div>
              </div>
            </div>
          </div>
        </div>
        </Col>
        <Col md={6}>
          <div>
            <br/>
            <p>
              <ul>
                <li>Over <b>1.5 Billion</b> unique people, <br/><small>including close to 260 million in the US.</small></li>
                <li>Over <b>1 billion</b> personal email addresses. <br/><small>Work email for 70%+ decision makers in the US, UK, and Canada.</small></li>
                <li>Over <b>420 million</b> linkedin urls</li>
                <li>Over <b>1 billion</b> facebook urls and ids.</li>
                <li><b>400 million+</b> phone numbers. <br/> <small>200 million+ US-based valid cell phone numbers.</small></li>
              </ul>
              <br/>
              <Link to="/data" activeClassName="active">
                <a style={{paddingLeft:'1em'}}>Preview dataset</a>
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
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

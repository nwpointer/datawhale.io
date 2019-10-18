import React, { useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { scale, rhythm } from "../utils/typography";
import * as Scroll from 'react-scroll';
import faker from 'faker';
import axios from 'axios'

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
        <button style={{marginLeft:'1em'}} className="excitable z1 secondary"><b>PREVIEW DATASET</b></button>
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
        <h3>Marketing Datasets</h3>
        <p>Reach your entire target audience and build campaigns that generate better results.</p>
      </Col>
      <Col className="growable" md={6}>
        <div className="circle growable invert z1 md blue">
          <i className="icon icofont-binoculars"></i>
        </div>
        <h3>Sales Datasets</h3>
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
              <a>Preview dataset</a>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const ContactUs = () => {
  const [screen, setScreen] = useState(0);
  const [Email, setEmail] = useState();
  const [Name, setName] = useState();
  const [Message, setMessage] = useState();
  const update = setter => e => setter(e.target.value)
  const send = e => {
    axios.get(`/.netlify/functions/email`, {Email, Message, Name})
      .then(({status})=>{
        console.log(status)
        if(status === 200){
          setScreen(1)
        } else {
          setScreen(2)
        }
      })
      .catch(console.log)
    console.log({Email,Message})
  }
  const Form = () => (
    <div className="formCard">
      <br className="sm-hide"/>
      <div className="horizontalCenter sm-hide">
        <div className="circle emoji growable invert sm-hide">🚀</div> 
      </div>
      <h2 className="textCenter sm-hide">Get started</h2>
      <br className="sm-hide"/>
      <div>
        <label className="fill" htmlFor="email">Email:</label>
        <input defaultValue={Email} onChange={update(setEmail)} className="fill" name="email" type="text" placeholder="you@company.com"/>
        <label className="fill" htmlFor="email">Name:</label>
        <input defaultValue={Name} onChange={update(setName)} className="fill" name="name" type="text" placeholder="first last"/>
        <label className="fill" htmlFor="message">Message:</label>
        <textarea defaultValue={Message} onChange={update(setMessage)} className="fill" name="message" type="text" placeholder="What are you trying to accomplish with Datawhale?"/>
        <button className="fill" onClick={send}>Request Demo</button>
      </div>
      <br className="sm-hide"/>
    </div>
  )
  const Confirmation = () => (
    <div className="formCard fill">
      <br />
      <br />
      <div className="horizontalCenter">
        <div className="circle green growable invert z1 md">
            <i className="icon icofont-check-circled"></i>
        </div>
      </div>
      <h2 className="center">Success!</h2>
      <p className="center">We'll contact you with more information soon.</p>
      <br />
      <br />
    </div>
  )
  const Problem = () => (
    <div className="formCard fill">
      <br />
      <br />
      <h2 className="center">Hmm... somethings not right</h2>
      <p className="center">please try again or email us at datawhale@gmail.com</p>
      <br />
      <button className="fill" onClick={()=>setScreen(0)}>back</button>
      <br />
      <br />
    </div>
  )

  const screens = [Form, Confirmation, Problem]
  return(
    <Scroll.Element name="test1">
      <div className="contact_us" style={{background: '#484265', display:'flex', position:'relative'}}>
        <div className="overlay"></div>
        <Container >
          <Row >
            <Col lg={6} style={{color:"white", display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <br />
              <h1 className="sm-center">See why the world’s best companies use Datawhale to become truly data-driven.</h1>
              <p className="sm-center">Join hundreds of companies using Datawhale.</p>
              <img className="sm-hide" width="60px" style={{marginLeft:'80px'}} src="https://www.pngkey.com/png/full/43-430893_white-curved-arrow-png-darkness.png" alt=""/>
              <br className="sm-hide"/>
              <br className="sm-hide"/>
            </Col>
            <Col lg={6} className="horizontalCenter">
                { screens[screen]() }
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

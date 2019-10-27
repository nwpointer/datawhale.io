import React, { useState } from "react"
import { Container, Row, Col } from 'react-grid-system';
import * as Scroll from 'react-scroll';
import axios from 'axios'


export default () => {
    const [screen, setScreen] = useState(0);
    const [Email, setEmail] = useState();
    const [Name, setName] = useState();
    const [Message, setMessage] = useState();
    const update = setter => e => setter(e.target.value)
    const send = e => {
      axios.get(`/.netlify/functions/email?Email=${Email}&Name=${Name}&Message=${Message}`)
        .then(({status})=>{
          console.log(status)
          if(status === 200){
            setScreen(1)
          } else {
            setScreen(2)
          }
        })
        .catch(console.log)
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
  
import React, { useState } from "react"
import { Container, Row, Col } from 'react-grid-system';
import * as Scroll from 'react-scroll';
import * as EmailValidator from 'email-validator';
import axios from 'axios'


export default () => {
    const [screen, setScreen] = useState(0);
    const [sending, setSending] = useState(false);
    const [Email, setEmail] = useState({value:'', valid: false});
    const [Name, setName] = useState({value:'', valid: false});
    const [Message, setMessage] = useState({value:'', valid: false});
    
    const [validation, setValidation] = useState({
      validating: false,
      error: ''
    });
    const validationStyles = field => validation.validating && !field.valid ? 'invalid' : ''
    const anyValidationErrors = !Email.valid || !Name.valid || !Message.valid
    const notValidEmail = !EmailValidator.validate(Email.value)
    
    const update = setter => e => {
      setSending(false)
      setter({
        value: e.target.value,
        valid: e.target.value.length > 0
      })
    }
    const send = e => {
      if(anyValidationErrors) {
        setValidation({validating: true, error:'(all fields are required)'});
        return
      }
      if(notValidEmail) {
        setEmail({...Email, valid: false})
        setValidation({validating: true, error:'please enter a valid email'});
        return
      }
      setSending(true)
      axios.get(`/.netlify/functions/email?Email=${Email.value}&Name=${Name.value}&Message=${Message.value}`)
        .then(({status})=>{
          setSending(false)
          console.log(status)
          if(status === 200){
            setScreen(1)
          } else {
            setScreen(2)
          }
        })
        .catch((error)=>{
          setSending(false)
          setScreen(2)
          console.log(error)
        })
      setValidation({validating: false, error: ''});
    }
    const Form = () => (
      <div className="formCard">
        {
          console.log()
        }
        <br className="sm-hide"/>
        <div className="horizontalCenter sm-hide">
          <div className="circle emoji growable invert sm-hide">🚀</div> 
        </div>
        <h2 className="textCenter sm-hide">Get started</h2>
        <br className="sm-hide"/>
        <div>
          <label className="fill" htmlFor="email">Email:</label>
          <input defaultValue={Email.value} onChange={update(setEmail)} className={`fill ${validationStyles(Email)}`} name="email" type="text" placeholder="you@company.com"/>
          <label className="fill" htmlFor="name">Name:</label>
          <input defaultValue={Name.value} onChange={update(setName)} className={`fill ${validationStyles(Name)}`} name="name" type="text" placeholder="first last"/>
          <label className="fill" htmlFor="message">Message:</label>
          <textarea defaultValue={Message.value} onChange={update(setMessage)} className={`fill ${validationStyles(Message)}`} name="message" type="text" placeholder="What are you trying to accomplish with Datawhale?"/>
          <button className="fill" onClick={send}>
          {
            sending 
            ? <div class="loader">Loading...</div>
            : 'Request Demo'
          }
          </button>
          {
            validation.validating &&
            <span className="fill validityNotice">{validation.error}</span>
          }
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
  
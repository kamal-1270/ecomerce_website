
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../styles/Contact.css"
import contact1 from "../pages/contact1.webp"

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm('service_wg56td2', 'template_x4ynysx', form.current, {
        publicKey: 'mSJp06O-4RK5y7kkI',
      })
      .then(
        () => {
          alert("Message sent Successfully");
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="contact-container">
      <div className="img1">
        <img src={contact1} alt="Contact" className="contact-image" />
      </div>
      <div className="form1">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <h2>Contact Me</h2>
          <div className="form-group">
            <label>Name <span style={{color:"red"}}>*</span></label>
            <input type="text" name="from_name" placeholder='Enter your name ...' className="form-control" required/>
          </div>
          <div className="form-group">
            <label>Email <span style={{color:"red"}}>*</span></label>
            <input type="email" name="from_email" placeholder='Enter your email ...' className="form-control" required/>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder='Enter a something ...' className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            <a className='btn_submit'>Send</a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
import React, { useRef } from 'react';
import {Link} from "react-router-dom";
import emailjs from '@emailjs/browser';
import "./Mail.css";
const Mail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xn97pnh', 'template_cppdfho', form.current, '43Q_ylv6qEn5j1dsL')
      .then((result) => {
          console.log(result.text);
          window.alert("Message sent");
      }, (error) => {
          console.log(error.text);
      });
  };
  return( 
    <>
    <h1>Send Notification</h1>
    <form ref={form} onSubmit={sendEmail}>
      
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
      <Link to="/main/SendMsg">
        <input type="button" value="Go Back"/>
      </Link>
    </form>
    </>
  );
};
export default Mail;


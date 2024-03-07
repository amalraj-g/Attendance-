import React from 'react'
import { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
// import Loader from '../components/Loader';

import { toast } from 'react-toastify';
// import Meta from '../components/Meta';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

   
const submitHandler = async (e) => {
      e.preventDefault();
      console.log("submit");
      try {
          const response = await fetch('/users/auth', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password}),
          });
          const data = await response.json();
          if (response.ok) {
              localStorage.setItem('user', JSON.stringify(data));
              navigate("/home");
          } else {
              console.error("Authentication failed:", data.message);
            
          }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }
    

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2' >Sign In</Button>

        </Form>

       
    </FormContainer>
  )
}

export default LoginScreen
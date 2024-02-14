import React from 'react'
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link} from 'react-router-dom';


const LoginScreen = () => {
   
  return (
    <FormContainer>
        <h1>Sign In</h1>
       
        <Form >
            <Form.Group controlId='name' className="my-3">
                <Form.Label> Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' ></Form.Control>
            </Form.Group>

            <Link  to='/home'><Button type='submit' variant='primary' className='mt-2' >Sign In</Button> </Link>

           
        </Form>

        
    </FormContainer>
  )
}

export default LoginScreen
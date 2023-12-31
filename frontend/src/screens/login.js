import React,{useState,useEffect} from 'react';
import { Link ,useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {Form, Button, Row, Col} from 'react-bootstrap';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=> state.auth);
    const redirect = "/";

    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e)=>{
        e.preventDefault()
        //alert("Done")
        try {
            const res = await login({email, password}).unwrap();
            console.log(res)
            dispatch(setCredentials({...res}));
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up </h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your pasword" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary" disabled={isLoading}>
                    Login
                </Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className="py-3">
                <Col>
                Don't have account with us? 
                <Link to='/register'>
                  sign up
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )

}

export default LoginScreen;
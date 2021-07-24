import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createUser } from '../actions/userActions.js'

const AdminInsertUser = ({ location, history }) => {
    const [username, setUsername] = useState('')
    //const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userCreate = useSelector(state => state.userCreate)
    const { loading, error, success: successCreate } = userCreate

    useEffect(() => {
        if (successCreate) {
            history.push('/admin/userlist')
        }
    }, [history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            userName: username,
            userEmail: email,
            userPassword: password,
       
        }
        dispatch(createUser(data))
        
    }

    return (
        <FormContainer>
            <h3>Insert User</h3>
            {message && <span><Message variant="danger">{message}</Message></span>}
            {error && <span><Message variant="danger">{error}</Message></span>}
            {loading && <h5><Loader /></h5>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required>

                    </Form.Control>
                </Form.Group>
             
                <Form.Group controlId="email" style={{ marginTop: "8px" }}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password" style={{ marginTop: "8px" }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required>

                    </Form.Control>
                </Form.Group>
            
                <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                    <Button
                        type="submit"
                        variant="primary">
                        Insert
                    </Button>
                </div>
            </Form>

        </FormContainer>
    )
}

export default AdminInsertUser

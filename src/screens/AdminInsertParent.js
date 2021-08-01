import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createParent } from '../actions/categoryActions'

const AdminInsertParent = ({ location, history }) => {
    const [name, setName] = useState('')
    
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const parentCreate = useSelector(state => state.parentCreate)
    const { loading, error, success: successCreate } = parentCreate

    useEffect(() => {
        if (successCreate) {
            history.push('/admin/categorylist')
        }
    }, [history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            categoryName: name
        }
        dispatch(createParent(data))
        
    }

    return (
        <FormContainer>
            <h3>Insert Parent Category</h3>
            {message && <span><Message variant="danger">{message}</Message></span>}
            {error && <span><Message variant="danger">Create failed. Input lack of field</Message></span>}
            {loading && <h5><Loader /></h5>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} required>

                    </Form.Control>
                </Form.Group>
             
                <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                    <Button
                        type="submit"
                        variant="primary"  disabled={name === ''}>
                        Insert
                    </Button>
                </div>
            </Form>

        </FormContainer>
    )
}

export default AdminInsertParent

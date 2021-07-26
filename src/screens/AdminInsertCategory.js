import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createCategory } from '../actions/categoryActions'

const AdminInsertCategory = ({ location, history }) => {
    const [name, setName] = useState('')
    
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading, error, success: successCreate } = categoryCreate

    useEffect(() => {
        if (successCreate) {
            history.push('/admin/categorylist')
        }
    }, [history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            categoryName: name,
       
        }
        dispatch(createCategory(data))
        
    }

    return (
        <FormContainer>
            <h3>Insert Category</h3>
            {message && <span><Message variant="danger">{message}</Message></span>}
            {error && <span><Message variant="danger">{error}</Message></span>}
            {loading && <h5><Loader /></h5>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Categoy Name</Form.Label>
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
                        variant="primary">
                        Insert
                    </Button>
                </div>
            </Form>

        </FormContainer>
    )
}

export default AdminInsertCategory

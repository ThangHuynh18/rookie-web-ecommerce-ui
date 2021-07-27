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
    const [parent, setParent] = useState(0);
    
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading, error, success: successCreate } = categoryCreate

    const parentList = useSelector(state => state.parentList)
    const {loading: loadingParent, error: errorParent, parents } = parentList

    useEffect(() => {
        if (successCreate) {
            history.push('/admin/categorylist')
        }
    }, [history, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            categoryName: name,
            parent_id: parent
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
                <Form.Group controlId="parent" style={{ marginTop: "8px" }}>
                        <Form.Label>Parent</Form.Label>
                         <select className="form-control" id="category" value={parent} onChange={(e) => setParent(e.target.value)}>
                                {  loadingParent ? <h5><Loader /></h5> : errorParent ? <h5><Message variant="danger">{errorParent}</Message></h5> : 
                                    parents.map(item =>  <option key={item.category_id} value={item.category_id}>{item.categoryName}</option>)}
                         </select>
                        
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

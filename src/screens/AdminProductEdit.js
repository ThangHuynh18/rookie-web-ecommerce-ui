import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions.js'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const AdminUpdateEdit = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {

            if (!product.data.productName || product.data.product_id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                // setName(product.data.productName)
                // setPrice(product.data.productPrice)
                // setImage(product.data.imageDTOS[0].imageLink)
                // setBrand(product.data.brand_id)
                // setCategory(product.data.category_id)
                // setCountInStock(product.data.productQty)
                // setDescription(product.data.productDescription)
            }

        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))

    }

    return (

        <>
            <Link className="my-3 text-decoration-none" to='/admin/productlist'><i class="fas fa-arrow-left"></i> Go back</Link>
            <FormContainer>
                <h3>Edit Product</h3>
                {loadingUpdate && <Loader />}
                {errorUpdate && <span><Message variant="danger">{errorUpdate}</Message></span>}
                {loading ? <Loader /> : error ? <span><Message variant="danger">{error}</Message></span> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price" style={{ marginTop: "8px" }}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image" style={{ marginTop: "8px" }}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>

                            </Form.Control>
                            <Form.File style={{ marginTop: "8px" }}
                                id="image-file"
                                custom
                                onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId="brand" style={{ marginTop: "8px" }}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="category" style={{ marginTop: "8px" }}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="countInStock" style={{ marginTop: "8px" }}>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter count in stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description" style={{ marginTop: "8px" }}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                            <Button
                                type="submit"
                                variant="primary">
                                Update
                            </Button>
                        </div>
                    </Form>
                )}
            </FormContainer>
        </>


    )
}

export default AdminUpdateEdit

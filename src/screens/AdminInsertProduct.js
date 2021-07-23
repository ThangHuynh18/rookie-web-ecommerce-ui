import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions.js'
import { listBrands } from '../actions/brandActions.js'
import { logDOM } from '@testing-library/react'

const AdminInsertProduct = ({ location, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState(0)
    const [category, setCategory] = useState(0)
    const [brand, setBrand] = useState(0)
    const [imageDTOS, setImageDTOS] = useState([])
    const [image, setImage] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    
    const { categories, error: errorCate, loading: loadingCate }  = useSelector(state => state.categoryList)

    const { brands, errorBrand, loadingBrand }  = useSelector(state => state.brandList)
    useEffect(() => {
        dispatch(listCategories())
        dispatch(listBrands())
        
    }, [dispatch])

    const productCreate = useSelector(state => state.productCreate)
    const { loading, error, productInfo } = productCreate

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (productInfo) {
            history.push(redirect)
        }
    }, [history, productInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        
        console.log(category)
        console.log(brand)
        // let isCategory = categories.data.find(item => item.categoryName === category)
        // let isBrand = brands.find(i => i.brandName === brand)

        // let category_id = isCategory.category_id
        // let brand_id = isBrand.brand_id


        // const formData = new FormData();
        // formData.append('productName', name);
        // formData.append('productPrice', price);
        // formData.append('productDescription', description);
        // formData.append('productQty', qty);
        // formData.append('category_id', category_id);
        // formData.append('brand_id', brand_id);
        
        const data = {
            productName: name,
            productPrice: price,
            productDescription: description,
            productQty: qty,
            category_id: category,
            brand_id: brand,
        }
        setImageDTOS(oldArray => [...oldArray, image])
        
        const imageDTOS = []
        data.imageDTOS = imageDTOS
        imageDTOS.forEach(i => {
            console.log('a' + i);
            data.imageDTOS.push(i)
            //formData.append(`imageDTOS[${i}].imageLink`, i)
        })
        data.imageDTOS.push({imageLink: image})
        console.log(data)
        dispatch(createProduct(data))

    }

    
    
      

    return (
        <FormContainer>
            <h3>Insert Product</h3>
            {message && <span><Message variant="danger">{message}</Message></span>}
            {error && <span><Message variant="danger">{error}</Message></span>}
            {loading && <h5><Loader /></h5>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
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
                <Form.Group controlId="description" style={{ marginTop: "8px" }}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="qty" style={{ marginTop: "8px" }}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Quantity"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="category" style={{ marginTop: "8px" }}>
                    <Form.Label>Category</Form.Label>
                     <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {  loadingCate ? <h5><Loader /></h5> : errorCate ? <h5><Message variant="danger">{errorCate}</Message></h5> : 
                                categories.map(item =>  <option key={item.category_id} value={item.category_id}>{item.categoryName}</option>)}
                     </select>
                    
                </Form.Group>
                <Form.Group controlId="brand" style={{ marginTop: "8px" }}>
                    <Form.Label>Brand</Form.Label>
                    <select className="form-control" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            {  loadingBrand ? <h5><Loader /></h5> : errorBrand ? <h5><Message variant="danger">{errorBrand}</Message></h5> : 
                                brands.map(item =>  <option key={item.brand_id} value={item.brand_id}>{item.brandName}</option>)}
                     </select>
                </Form.Group>
                <Form.Group controlId="image" style={{ marginTop: "8px" }}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Image link"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}>

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

export default AdminInsertProduct

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
import { listCategories } from '../actions/categoryActions.js'
import { listBrands } from '../actions/brandActions.js'

const AdminUpdateEdit = ({ match, history }) => {
    const productId = match.params.id

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [qty, setQty] = useState(0)
    const [category, setCategory] = useState(0)
    const [brand, setBrand] = useState(0)
    const [imageDTOS, setImageDTOS] = useState([])
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const { categories, error: errorCate, loading: loadingCate }  = useSelector(state => state.categoryList)

    const { brands, errorBrand, loadingBrand }  = useSelector(state => state.brandList)
    
    useEffect(() => {
        dispatch(listCategories())
        dispatch(listBrands())
        
    }, [dispatch])

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            console.log('not product' + product);
            if (!product) {
                
                dispatch(listProductDetails( productId))
            } 
            else {
    
                console.log(product)
                setName(product.data.productName)
                setPrice(product.data.productPrice)
                setImage(product.data.imageDTOS[0].imageLink)
                setBrand(product.data.brand_id)
                setCategory(product.data.category_id)
                setQty(product.data.productQty)
                setDescription(product.data.productDescription)
            }
        }
    }, [dispatch, history, productId, product, successUpdate])


    const onChange = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        console.log(file);
        // if (!file) {
        //     return alert.error('File not exist!')
        // }
        // if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        //     return alert.error('File format is incorrect!')
        // }
        // if (file.size > 1024 * 1024 * 5) {
        //     return alert.error('File too large!')
        // }
        let formData = new FormData()
        formData.append('file', file)

        const res = await axios.post('/api/products/upload', formData, {
            headers: { 'content-type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.accessToken}`
        }
        })
        console.log(res.data);
        setImage(res.data)
    }

    const submitHandler = (e) => {
        e.preventDefault()

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
        dispatch(updateProduct(data))

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
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} required>
                        </Form.Control>
                    </Form.Group>
                 
                    <Form.Group controlId="price" style={{ marginTop: "8px" }}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} required>
    
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description" style={{ marginTop: "8px" }}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} required>
    
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="qty" style={{ marginTop: "8px" }}>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Quantity"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)} required>
    
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

                    {/* <Form.Group controlId="image" style={{ marginTop: "8px" }}>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            id='file' 
                            required
                            value={image.url}
                            accept="images/*"
                            onChange={onChange}>

                        </Form.Control>
                        <Form.Label>{image.url}</Form.Label>
                    </Form.Group> */}
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

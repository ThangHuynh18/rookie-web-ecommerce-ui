import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions.js'

const ProductDetail = ({ history, match }) => {

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productDetails)


    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])



    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className="my-3 text-decoration-none" to='/'><i class="fas fa-arrow-left"></i> Go back</Link>
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> :
                    <Row>
                        <Col md={5}>
                            <Image src={product.data.imageDTOS[0].imageLink} alt={product.data.productName} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.data.productName}</h3>
                                </ListGroup.Item>
                                {/* <ListGroup.Item>
                                    <Rating value={product.data.ratingDTOS[0].ratingNumber} />
                                </ListGroup.Item> */}
                                <ListGroup.Item>
                                    <h5>Price :  
                                        <NumberFormat value={product.data.productPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                    </h5>
                            
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.data.productDescription}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <h5>Price:</h5>
                                            </Col>
                                            <Col>
                                                <h5><NumberFormat value={product.data.productPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></h5>
                                               
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.data.productQty > 0 ? "In Stock" : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.data.productQty > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.data.productQty).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <div className="d-grid gap-2">
                                            <Button
                                                onClick={addToCartHandler}
                                                type="submit"
                                                variant="primary"
                                                disabled={product.data.productQty === 0}>
                                                Add To Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </>
    )
}

export default ProductDetail

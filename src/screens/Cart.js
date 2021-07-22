import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={9}>
                <h4><strong>Shopping Cart</strong></h4>
                {
                    cartItems.length === 0
                        ? <Message variant="info">Your cart is empty <span className="font-weight-bold text-uppercase"><Link to='/' className="text-decoration-none">Back to home</Link></span></Message>
                        : (
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col md={3} style={{ margin: "auto" }}>
                                                <Link className="text-decoration-none" to={`products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2} style={{ margin: "auto" }}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2} style={{ margin: "auto" }}>
                                                <Form.Control as="select" value={item.qty} onChange={(e) =>
                                                    dispatch(addToCart(item.product, Number(e.target.value)))}>

                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2} style={{ margin: "auto" }}>
                                                <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                    <i class="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                }
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button
                                    onClick={checkoutHandler}
                                    type="submit"
                                    variant="primary"
                                    disabled={cartItems.length === 0}>
                                    Proceed To Checkout
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart

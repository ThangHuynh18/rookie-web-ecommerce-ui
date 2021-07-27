import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions.js'

const PlaceOrder = ({ history }) => {

    // const addDecimals = (num) => {
    //     return (Math.round(num * 100) / 100).toFixed(2)
    // }
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 100000 ? 0 : 10000
    cart.taxPrice = Number((0.1 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice
    // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice


    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/profile`)
            // history.push(`/orders/${order.order_id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    let qtyCart = 0
    for(let i = 0; i < cart.cartItems.length; i++) {
        qtyCart = qtyCart + cart.cartItems[i].qty
    }

    const placeOrderHandler = (e) => {
        e.preventDefault()
        
        const data = {
            totalQty: qtyCart,
            totalPrice: cart.itemsPrice,
            user_id: userInfo.id,
            status_id: 1,
            
          };
        const cartItems=cart.cartItems
        dispatch(createOrder(data,cartItems))
        // dispatch(createOrder({
        //     orderItems: cart.cartItems,
        //     shippingAddress: cart.shippingAddress,
        //     paymentMethod: cart.paymentMethod,
        //     itemsPrice: cart.itemsPrice,
        //     shippingPrice: cart.shippingPrice,
        //     taxPrice: cart.taxPrice,
        //     totalPrice: cart.totalPrice

        // }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <h3>Place Order</h3>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                {/* <strong>Address: </strong>{cart.shippingAddress.address},{' '}{cart.shippingAddress.city},{' '}{cart.shippingAddress.country} */}
                                <strong>Address: </strong>{cart.shippingAddress.udetailAddress}
                            </p>
                            <p>
                                <strong>Phone: </strong>{cart.shippingAddress.udetailPhone}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>{cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {cart.cartItems.length === 0
                                ? <Message>Your cart is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <Link className="text-decoration-none" to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4} style={{ margin: "auto" }}>
                                                    {item.qty} x <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/> = <NumberFormat value={item.qty * item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                                        {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col><NumberFormat value={cart.itemsPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col><NumberFormat value={cart.shippingPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><NumberFormat value={cart.taxPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><NumberFormat value={cart.totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <span><Message variant="danger">{error}</Message></span>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                                    <Button
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}
                                        type="submit"
                                        variant="primary">
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrder

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions.js'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const Order = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }


    useEffect(() => {
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        <>
            <h3>Order {order._id}</h3>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Name: </strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:{order.user.email}`} className="text-decoration-none">{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                            </p>
                            <p>
                                <strong>Postal Code: </strong>{order.shippingAddress.postalCode}
                            </p>
                            <p>
                                {order.isDelivered
                                    ? <Message variant="success">Delivered on {order.DeliveredAt} </Message>
                                    : <Message variant="danger">Not Delivered</Message>
                                }
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>{order.paymentMethod}
                            </p>
                            <p>
                                {order.isPaid
                                    ? <Message variant="success">Paid on {order.paidAt} </Message>
                                    : <Message variant="danger">Not paid</Message>
                                }
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {order.orderItems.length === 0
                                ? <Message>Order is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <Link className="text-decoration-none" to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4} style={{ margin: "auto" }}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
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
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                                        <Button
                                            onClick={successPaymentHandler}
                                            type="submit"
                                            variant="outline-success">
                                            PayPal
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default Order

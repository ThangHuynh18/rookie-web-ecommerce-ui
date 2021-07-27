import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, listDetailOrder } from '../actions/orderActions.js'
import { ORDER_PAY_RESET, DETAIL_ORDER_LIST_RESET } from '../constants/orderConstants'

const OrderDetail = ({ match, history }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const { listDetail, loading: loadingDetail, error: errorDetail }  = useSelector((state) => state.listDetail)
    

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    })

    useEffect(() => {
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
            dispatch(listDetailOrder(orderId))
        }
        if(listDetail) {
            dispatch({ type: DETAIL_ORDER_LIST_RESET })
            dispatch(listDetailOrder(orderId))
        }

    }, [dispatch, orderId, successPay, order])

    // const successPaymentHandler = (paymentResult) => {
    //     console.log(paymentResult)
    //     dispatch(payOrder(orderId, paymentResult))
    // }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
        <>
            <h3>Order {order.data.order_id}</h3>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {userInfo && (
                                <>
                                    <h4>Shipping</h4>
                                    <p>
                                        <strong>Name: </strong>{userInfo.username}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {userInfo.email}
                                    </p>
                                    {/* <p>
                                        <strong>Address: </strong>{order.shippingAddress.address}
                                    </p>
                                    <p>
                                        <strong>Phone: </strong>{order.shippingAddress.phone}
                                    </p> */}
                                    {/* <p>
                                        {order.isDelivered
                                            ? <Message variant="success">Delivered on {order.DeliveredAt} </Message>
                                            : <Message variant="danger">Not Delivered</Message>
                                        }
                                    </p> */}
                            </>
                            )}
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
                            {loadingDetail ? <Loader /> : errorDetail ? <span><Message variant="danger">{errorDetail}</Message></span> : (
                                    <ListGroup variant="flush">
                                        {listDetail.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image[0].imageLink} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col style={{ margin: "auto" }}>
                                                        <Link className="text-decoration-none" to={`/product/${item.image[0].product_id}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4} style={{ margin: "auto" }}>
                                                        {item.detailQty} x <NumberFormat value={item.detailPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'}/> 
                                                        = <NumberFormat value={item.detailQty * item.detailPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'}/>
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
                                    <Col>{order.data.totalQty}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
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
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><NumberFormat value={order.data.totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            {/* {!order.isPaid && (
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
                            )} */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderDetail

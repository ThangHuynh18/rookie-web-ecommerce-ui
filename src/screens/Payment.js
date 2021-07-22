import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h3>Payment</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                        <Form.Check
                            type="radio"
                            label="Ship COD"
                            id="ShipCOD"
                            name="paymentMethod"
                            value='Ship COD'
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>
                <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
                    <Button
                        type="submit"
                        variant="primary">
                        Continue
                    </Button>
                </div>
            </Form>
        </FormContainer>
    )
}

export default Payment

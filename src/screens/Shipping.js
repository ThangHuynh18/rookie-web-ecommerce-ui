import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const Shipping = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [phone, setPhone] = useState(shippingAddress.phone)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.postalCode)
    const [postalCode, setPostalCode] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (!user) {
    //       dispatch({ type: USER_UPDATE_PROFILE_RESET });
    //       dispatch(getUserDetails(userInfo.id));
    //       dispatch(getMyListOrder(userInfo.id))
    //     } else {
    //       setUsername(user.data.userName);
    //       setEmail(user.data.userEmail);
    //     }
    //   }, [dispatch, userInfo.id, user]);

    const submitHandler = (e) => {
        e.preventDefault()
         dispatch(saveShippingAddress({ address, city, postalCode, country }))
        //dispatch(saveShippingAddress({ address, phone }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h3>Shipping</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}>

                    </Form.Control>
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

export default Shipping

import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { getDetailsOfUser } from '../actions/userActions.js'

const Shipping = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [city, setCity] = useState(shippingAddress.postalCode)
    const [postalCode, setPostalCode] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const detailsOfUser = useSelector(state => state.detailsOfUser)
    const { loading: loadingDetail, error: errorDetail, detail } = detailsOfUser
    // const [phone, setPhone] = useState(detail[0].udetailPhone)
    // const [address, setAddress] = useState(detail[0].udetailAddress)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }else{
            dispatch(getDetailsOfUser(userInfo.id));
        }  
    }, [dispatch, history, userInfo]);              

    
    console.log(detail);
    
    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            udetailPhone: phone,
            udetailAddress: address,
            
          };
         //dispatch(saveShippingAddress({ address, city, postalCode, country }))
        dispatch(saveShippingAddress(data))
        history.push('/payment')
    }

    return (
        <FormContainer>
            {/* {errorDetail && <span><Message variant="danger">{errorDetail}</Message></span>}
            {loadingDetail && <h5><Loader /></h5>} */}
            <CheckoutSteps step1 step2 />
            <h3>Shipping</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    {detail !== null ? (
                            <select className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)}>
                                    {  loadingDetail ? <h5><Loader /></h5> : errorDetail ? <h5><Message variant="danger">{errorDetail}</Message></h5> : 
                                        detail.map(item =>  <option key={item.udetail_id} value={item.udetailAddress}>{item.udetailAddress}</option>)}
                            </select>
                         )
                         :(
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}>

                            </Form.Control>
                         )
                }
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    {detail !== null ? (
                            <select className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}>
                                        {  loadingDetail ? <h5><Loader /></h5> : errorDetail ? <h5><Message variant="danger">{errorDetail}</Message></h5> : 
                                            detail.map(item =>  <option key={item.udetail_id} value={item.udetailPhone}>{item.udetailPhone}</option>)}
                                </select>
                          )
                          :(
                            <Form.Control
                                type="number"
                                placeholder="Enter your phone"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}>

                            </Form.Control>
                    )
                }
                </Form.Group>
                {/* <Form.Group controlId="city">
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
                </Form.Group> */}
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

import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions.js'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


const AdminListProducts = ({ history, match }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (userInfo && userInfo.roles[0] === 'admin') {
            if (successCreate) {
                history.push(`/admin/product/${createdProduct._id}/edit`)
            } else {
                dispatch(listProducts())
            }
        }
        else {
            history.push('/login')

        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteProduct(id))
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h3>Products</h3>
                    <Button size="sm" variant="outline-primary" onClick={createProductHandler}>
                        <i className="fas fa-plus"> Create product</i>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <h5><Loader /></h5>}
            {errorDelete && <h5><Message variant="danger">{errorDelete}</Message></h5>}
            {loadingCreate && <h5><Loader /></h5>}
            {errorCreate && <h5><Message variant="danger">{errorCreate}</Message></h5>}
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (

                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>QUANTITY</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map(product => (
                                <tr key={product.product_id}>
                                    <td class="align-middle">
                                        <img src={product.imageDTOS[0].imageLink} alt={product.productName} style={{width: '50%', height: 'auto'}}></img>
                                    </td>
                                    <td class="align-middle">{product.product_id}</td>
                                    <td class="align-middle">{product.productName}</td>
                                    <td class="align-middle">${product.productPrice}</td>
                                    <td class="align-middle">{product.categoryName}</td>
                                    <td class="align-middle">{product.brandName}</td>
                                    <td class="align-middle">{product.productQty}</td>
                                    <td class="align-middle">
                                        <LinkContainer to={`/admin/product/${product.product_id}/edit`} className="text-decoration-none">
                                            <Button className="btn-sm" variant="light">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product.product_id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                )
            }

        </>
    )
}

export default AdminListProducts

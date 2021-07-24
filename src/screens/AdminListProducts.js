import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions.js'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { listCategories } from '../actions/categoryActions.js'
import { listBrands } from '../actions/brandActions.js'
import { useAlert } from 'react-alert'
import { MDBDataTableV5 } from 'mdbreact'


const AdminListProducts = ({ history, match }) => {
    const dispatch = useDispatch()
     const alert = useAlert()

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
                history.push('/admin/productlist')
            } else {
                dispatch(listProducts())
                dispatch(listCategories())
                dispatch(listBrands())
            }
        }
        else {
            history.push('/login')

        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const setListProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Product ID',
                    field: 'product_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'productName',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'productPrice',
                    sort: 'asc'
                },
                {
                    label: 'Quantity',
                    field: 'productQty',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Brand',
                    field: 'brand',
                    sort: 'asc'
                },
                {
                    label: 'Image',
                    field: 'imageLink',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
                
            ],
            rows: []
        }
        products.data.forEach(product => {
            data.rows.push({
                product_id: product.product_id,
                productName: product.productName,
                productPrice: product.productPrice,
                productQty: product.productQty,
                category: product.categoryName,
                brand: product.brandName,
                imageLink:[<img src={ product.imageDTOS[0].imageLink} alt={product.productName} style={{width: '150px'}}/>],
                
                actions:
                    [
                        <>
                        <LinkContainer to={`/admin/product/${product.product_id}/edit`} className="text-decoration-none">
                                            <Button className="btn-sm" variant="light">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                        </LinkContainer>
                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product.product_id)}>
                                            <i className="fas fa-trash"></i>
                        </Button>
                        </>
                    ]
                         
            })
        })
        return data
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteProduct(id))
             if(successDelete){alert.success("Delete product successfully")}
    }

    const createProductHandler = () => {
        //dispatch(createProduct())
        history.push('/admin/product/insert')
    }

    return (
        <>
            <Row className="align-items-center">
                <Col xl={10}> 
                    <h3>Products</h3>
                    
                </Col>
                <Col xl={2}> 
                    <Button size="sm" variant="outline-primary" onClick={createProductHandler}>
                        <i className="fas fa-plus"> Create product</i>
                    </Button>
                </Col>
            </Row>
            {/* {loadingDelete && <h5><Loader /></h5>} */}
            {errorDelete && <h5><Message variant="danger">{errorDelete}</Message></h5>}
            {loadingCreate && <h5><Loader /></h5>}
            {errorCreate && <h5><Message variant="danger">{errorCreate}</Message></h5>}
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (

                    // <Table striped bordered hover responsive className="table-sm">
                    //     <thead>
                    //         <tr>
                    //             <th>IMAGE</th>
                    //             <th>ID</th>
                    //             <th>NAME</th>
                    //             <th>PRICE</th>
                    //             <th>CATEGORY</th>
                    //             <th>BRAND</th>
                    //             <th>QUANTITY</th>
                    //             <th></th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {products.data.map(product => (
                    //             <tr key={product.product_id}>
                    //                 <td class="align-middle">
                    //                     <img src={product.imageDTOS[0].imageLink} alt={product.productName} style={{width: '50%', height: 'auto'}}></img>
                    //                 </td>
                    //                 <td class="align-middle">{product.product_id}</td>
                    //                 <td class="align-middle">{product.productName}</td>
                    //                 <td class="align-middle">${product.productPrice}</td>
                    //                 <td class="align-middle">{product.categoryName}</td>
                    //                 <td class="align-middle">{product.brandName}</td>
                    //                 <td class="align-middle">{product.productQty}</td>
                    //                 <td class="align-middle">
                    //                     <LinkContainer to={`/admin/product/${product.product_id}/edit`} className="text-decoration-none">
                    //                         <Button className="btn-sm" variant="light">
                    //                             <i className="fas fa-edit"></i>
                    //                         </Button>
                    //                     </LinkContainer>
                    //                     <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product.product_id)}>
                    //                         <i className="fas fa-trash"></i>
                    //                     </Button>
                    //                 </td>
                    //             </tr>
                    //         ))}

                    //     </tbody>
                    // </Table>

                    <MDBDataTableV5
                        data={setListProducts()}
                        className="px-3"
                        striped
                        hover
                        entriesOptions={[5, 10, 20]}
                        entries={5}
                        pagingTop
                        searchTop
                        searchBottom={false}
                        barReverse
                    />
                )
            }

        </>
    )
}

export default AdminListProducts

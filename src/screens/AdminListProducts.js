import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Route} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsAdmin, deleteProduct, createProduct, listProducts,listProductCategories, listProductBrands } from '../actions/productActions.js'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'
import { listCategories } from '../actions/categoryActions.js'
import { listBrands } from '../actions/brandActions.js'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination"
import SearchInAdmin from '../components/SearchInAdmin.js'
import { MDBDataTableV5 } from 'mdbreact'
import NumberFormat from 'react-number-format';


const AdminListProducts = ({ history, match }) => {
    const dispatch = useDispatch()
     const alert = useAlert()


     const productList = useSelector(state => state.productList)
     const { loading, error, products, totalItems } = productList
     const [currentPage, setCurrentPage] = useState(1)
     const [cate, setCate] = useState({id: '', name: ''})
     const [brand, setBrand] = useState({id: '', name: ''})
     const keyword = match.params.keyword
     const category_id = match.params.category_id
     const brand_id = match.params.brand_id
     const { categories }  = useSelector(state => state.categoryList)
     const { brands }  = useSelector(state => state.brandList)



    // const productListAdmin = useSelector(state => state.productListAdmin)
    // const { loading, error, products } = productListAdmin

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        dispatch({ type: PRODUCT_DELETE_RESET })
        
        if (userInfo && userInfo.roles[0] === 'admin') {
            if (successCreate) {
                history.push('/admin/productlist')
            } else {
                if(!categories || !brands) {
                    dispatch(listCategories())
                    dispatch(listBrands())
                }
                dispatch(listProducts(keyword,currentPage, cate.id, brand.id))
                if(category_id){

                    dispatch(listProductCategories(category_id))
                }
                if(brand_id){

                    dispatch(listProductBrands(brand_id))
                }
                // dispatch(listProductsAdmin())
                // dispatch(listCategories())
                // dispatch(listBrands())
            }
        }
        else {
            history.push('/login')

        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword, currentPage, brand_id, category_id, cate.id, brand.id])

    function setCurrentPageNo(pageNumber) {
        
        setCurrentPage(pageNumber)
    }
    
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
             if(successDelete){alert.success("Delete product successfully")}
    }}

    const createProductHandler = () => {
        //dispatch(createProduct())
        history.push('/admin/product/insert')
    }

    return (
        <>
            <Row className="align-items-center">
                <Col xl={3}> 
                    <Row><h3>Products</h3></Row>
                    <Row><Route render={({ history }) => <SearchInAdmin history={history} />} /></Row>
                    <Row>
                        <h5>Categories</h5>
                            
                            <select class="form-select" onChange={(e) => {
                                setCate({id: e.target.value, name: e.target.options[e.target.selectedIndex].text})
                            }}>
                            <option value='' selected>All</option>
                            {
                                categories && categories.map(item => (
                                    <option key={item.category_id}  value={item.category_id}>{item.categoryName}</option>
                                ))
                            }
                            </select>
                    </Row>
                    <Row>
                        <h5>Brands</h5>
                            <select class="form-select" onChange={(e) => {
                                setBrand({id: e.target.value, name: e.target.options[e.target.selectedIndex].text})
                            }}>
                            <option value='' selected>All</option>
                            {
                                brands && brands.map(item => (
                                    <option key={item.brand_id}  value={item.brand_id}>{item.brandName}</option>
                                ))
                            }
                            </select>
                    </Row>
                    
                </Col>
                <Col xl={7}></Col>
                <Col xl={2}> 
                    <Row>
                        <Button size="sm" variant="outline-primary" onClick={createProductHandler}>
                            <i className="fas fa-plus"> Create product</i>
                        </Button>
                    </Row>
                
                </Col>
            </Row>
            {/* {loadingDelete && <h5><Loader /></h5>} */}
            {errorDelete && <h5><Message variant="danger">Delete failed. The product is already in the order</Message></h5>}
            {loadingCreate && <h5><Loader /></h5>}
            {errorCreate && <h5><Message variant="danger">Create failed. Input lack of field</Message></h5>}
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (
                    <>
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
                                            {products.map(product => (
                                                <tr key={product.product_id}>
                                                    <td class="align-middle">
                                                        <img src={product.imageDTOS[0].imageLink} alt={product.productName} style={{width: '150px'}}></img>
                                                    </td>
                                                    <td class="align-middle">{product.product_id}</td>
                                                    <td class="align-middle">{product.productName}</td>
                                                    <td class="align-middle"><NumberFormat value={product.productPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></td>
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

                                    <div className="product-pagination">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={6}
                                                totalItemsCount={totalItems}
                                                onChange={setCurrentPageNo}
                                                nextPageText={'Next'}
                                                prevPageText={'Prev'}
                                                firstPageText={'First'}
                                                lastPageText={'Last'}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </div>
                     </>
                  
                )
            }

        </>
    )
}

export default AdminListProducts

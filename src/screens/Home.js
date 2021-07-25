import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts,listProductCategories, listProductBrands } from '../actions/productActions.js'
import Pagination from "react-js-pagination"

const Home = ({match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, totalItems } = productList
    const [currentPage, setCurrentPage] = useState(1)
    
    const { loading: loadingCategory, error: errorCategory, productsCate } = useSelector(state => state.productsCategory)
    const category_id = match.params.category_id
    
    const brand_id = match.params.brand_id
    const { productBrands, error: errorProductBrand, loading: loadingProductBrand }  = useSelector(state => state.productBrandList)
    const keyword = match.params.keyword
    useEffect(() => {
        dispatch(listProducts(keyword,currentPage))
        dispatch(listProductCategories(category_id))
        dispatch(listProductBrands(brand_id))
        console.log(currentPage);
    }, [dispatch, keyword, currentPage, category_id, brand_id])

    function setCurrentPageNo(pageNumber) {
        
        setCurrentPage(pageNumber)
    }

    return (
    
        <>
        {
            category_id ? 
            (
                <>
                <h3>Category: </h3>
                {
                    loadingCategory ? <h5><Loader /></h5> : errorCategory ? <h5><Message variant="danger">{errorCategory}</Message></h5> :
                        <Row>
                            {productsCate.map(product => ( 
                                <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
               
                }
                </>
            )
            :
            brand_id ? 
            (
                <>
                <h3>Brand: </h3>
                {
                    loadingProductBrand ? <h5><Loader /></h5> : errorProductBrand ? <h5><Message variant="danger">{errorProductBrand}</Message></h5> :
                        <Row>
                            {productBrands.map(product => ( 
                                <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
               
                }
                </>
            )
            :
            (
                <>
                <h3>Latest Products</h3>
                {
                    loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> :
                    <>
                        <Row>
                            {products.map(product => ( 
                                <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        

                                <div className="product-pagination">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={8}
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
                }
                </>
            )
        }           
        </>
    )
}

export default Home

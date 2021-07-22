import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts,listProductCategories, listProductBrands } from '../actions/productActions.js'


const Home = ({match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    
    const { loading: loadingCategory, error: errorCategory, productsCate } = useSelector(state => state.productsCategory)
    const category_id = match.params.category_id
    
    const brand_id = match.params.brand_id
    const { productBrands, error: errorProductBrand, loading: loadingProductBrand }  = useSelector(state => state.productBrandList)

    useEffect(() => {
        dispatch(listProducts())
        dispatch(listProductCategories(category_id))
        dispatch(listProductBrands(brand_id))
    }, [dispatch, category_id, brand_id])

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
                        <Row>
                            {products.data.map(product => ( 
                                <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                }
                </>
            )
        }           
        </>
    )
}

export default Home

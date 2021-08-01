import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Container, Navbar, Nav, NavDropdown ,Form , FormControl, Button, Dropdown} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Product from '../components/Product.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { listProducts,listProductCategories, listProductBrands } from '../actions/productActions.js'
import { listBrands } from '../actions/brandActions.js'
import { listCategories } from '../actions/categoryActions.js'

import Pagination from "react-js-pagination"

const Home = ({match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, totalItems } = productList
    const [currentPage, setCurrentPage] = useState(1)
    const [cate, setCate] = useState({id: '', name: ''})
    const [brand, setBrand] = useState({id: '', name: ''})
    const [cateId, setCateId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [cateName, setCateName] = useState('')
    const [brandName, setBrandName] = useState('')
    
    const { loading: loadingCategory, error: errorCategory, productsCate } = useSelector(state => state.productsCategory)
    const category_id = match.params.category_id
    
    const brand_id = match.params.brand_id

    const { categories, error: errorBCategoryList, loading: loadingCategoryList }  = useSelector(state => state.categoryList)
    const { brands, error: errorBrandList, loading: loadingBrandList }  = useSelector(state => state.brandList)

    const { productBrands, error: errorProductBrand, loading: loadingProductBrand }  = useSelector(state => state.productBrandList)
    const keyword = match.params.keyword
    
    useEffect(() => {
        if(!categories || !brands) {
            dispatch(listCategories())
            dispatch(listBrands())
        }
        // if(categories){
        //     console.log(categories);
        //     for (let index = 0; index < categories.length; index++) {
        //         if(cateId === categories[index].category_id){
        //             console.log(categories[index].category_id);
        //             return setCateName(categories[index].categoryName)
        //         }
        //     }
        // }
        // if(brands){
        //     console.log(brands);

        //     for (let index = 0; index < brands.length; index++) {
        //         if(brandId === brands[index].brand_id){
        //             console.log(brands[index].brand_id)
        //             return setBrandName(brands[index].brandName)
        //         }
        //     }
        // }
            
        
        dispatch(listProducts(keyword,currentPage, cate.id, brand.id))
        if(category_id){

            dispatch(listProductCategories(category_id))
        }
        if(brand_id){

            dispatch(listProductBrands(brand_id))
        }
       
    }, [dispatch, keyword, currentPage, brand_id, category_id, cate.id, brand.id, cateName, brandName])

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
                    productsCate && loadingCategory ? <h5><Loader /></h5> : errorCategory ? <h5><Message variant="danger">{errorCategory}</Message></h5> :
                        <Row>
                            {productsCate && productsCate.map(product => ( 
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
                            {productBrands && productBrands.map(product => ( 
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
                    
                    <Row>
                        <Col sm={12} md={6} lg={4} xl={3}>
                        <h4>Filters</h4>
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
                            {/* <p 
                                onClick={() => setCate({id: '', name: ''})}
                                style={{cursor: 'pointer'}}>All</p>
                            {
                                categories && categories.map(item => (
                                    <p key={item.category_id}  onClick={() => setCate({id: item.category_id, name: item.categoryName})} style={{cursor: 'pointer'}}>{item.categoryName}</p>
                                   
                                ))
                            } */}
                        
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
                        {/* <>
                            <p 
                                onClick={() => setBrand({id: '', name: ''})}  
                                style={{cursor: 'pointer'}}>All</p>
                            {
                                brands && brands.map(item => (
                                    <p key={item.brand_id}  onClick={() => setBrand({id: item.brand_id, name: item.brandName})} style={{cursor: 'pointer'}}>{item.brandName}</p>
                                   
                                ))
                            }
                        </> */}
                        </Col>
                        <Col sm={12} md={6} lg={4} xl={9}>
                        
                            {
                            loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> :
                            <>
                                {
                                    cate.id && brand.id ? <h5>Filter by: {cate.name}, {brand.name}</h5>
                                    : brand.id ? <h4>Filter by: {brand.name}</h4> : cate.id ? <h4>Filter by: {cate.name}</h4> 
                                    : null
                                }
                                <Row>
                                    {products && products.map(product => ( 
                                        <Col key={product.product_id} sm={12} md={6} lg={4} xl={4}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                

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
                        }
                        </Col>
                    </Row>                      
                            {/* <>
                                <Dropdown className="d-inline mx-2">
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                    Categories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    {
                                        categories && categories.map(item => (
                                            <Dropdown.Item key={item.category_id}  onClick={() => setCateId(item.category_id)}>{item.categoryName}</Dropdown.Item>
                                           
                                        ))
                                    }
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className="d-inline mx-2">
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                    Brands
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    {
                                        brands && brands.map(item => (
                                            <Dropdown.Item key={item.brand_id}  onClick={() => setBrandId(item.brand_id)}>{item.brandName}</Dropdown.Item>
                                           
                                        ))
                                    }
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                                <h3 onClick={() => {setBrandId(''); setCateId('')}}>Clear ALL</h3>
                                    
                            </> */}
               
                </>
            )
        }           
        </>
    )
}

export default Home

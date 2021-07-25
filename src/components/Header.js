import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown ,Form , FormControl, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions.js";
import Loader from './Loader'
import Message from './Message'
import Search from './Search'
import { listCategories } from '../actions/categoryActions.js'
import { listBrands } from '../actions/brandActions.js'
import { Link ,Route} from 'react-router-dom'

const Header = ({history}) => {
  const dispatch = useDispatch();
  //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const { categories, error, loading }  = useSelector(state => state.categoryList)
  const { brands, errorBrand, loadingBrand }  = useSelector(state => state.brandList)
  
  const logoutHandler = () => {
    dispatch(logout())
  }

    useEffect(() => {
        dispatch(listCategories())
        dispatch(listBrands())
    }, [dispatch])

    

  

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        
          <LinkContainer to="/">
            <Navbar.Brand>T Watch</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <Search history={history} />} />
            <Nav className="ms-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
              {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : 
                  categories.map(item => (
                    <LinkContainer to={`/products/category/${item.category_id}`}>
                      <NavDropdown.Item key={item.category_id}>{item.categoryName}</NavDropdown.Item>
                    </LinkContainer>
                  ))
              }  
                

              {/* <NavDropdown.Item href="#action/3.1">Category 1</NavDropdown.Item>    

              <NavDropdown.Item href="#action/3.3">Category 2</NavDropdown.Item>

              <NavDropdown title="Category 3" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Category 3.1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Category 3.2</NavDropdown.Item>
              </NavDropdown> */}
            </NavDropdown>

            <NavDropdown title="Brands" id="basic-nav-dropdown">
            {
                loadingBrand ? <h5><Loader /></h5> : errorBrand ? <h5><Message variant="danger">{errorBrand}</Message></h5> : 
                brands.map(item => (
                  <LinkContainer to={`/products/brand/${item.brand_id}`}>
                      <NavDropdown.Item key={item.brand_id}>{item.brandName}</NavDropdown.Item>  
                  </LinkContainer>
                  ))
            } 

              {/* <NavDropdown.Item href="#action/3.1">A</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            </NavDropdown>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i class="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i class="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.roles[0] === 'admin' && (
                <NavDropdown title="ADMIN DASHBOARD" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </header>
    
  );
};

export default Header;

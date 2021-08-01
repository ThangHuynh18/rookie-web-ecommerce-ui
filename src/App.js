import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProductDetail from './screens/ProductDetail'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Shipping from './screens/Shipping'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'
import Order from './screens/Order'
import AdminListUsers from './screens/AdminListUsers'
import AdminUserEdit from './screens/AdminUserEdit'
import AdminListProducts from './screens/AdminListProducts'
import AdminProductEdit from './screens/AdminProductEdit'
import AdminListOrders from './screens/AdminListOrders'
import AdminInsertProduct from './screens/AdminInsertProduct'
import AdminInsertUser from './screens/AdminInsertUser'
import AdminLisCategory from './screens/AdminListCategory'
import AdminInsertCategory from './screens/AdminInsertCategory'
import AdminCategoryEdit from './screens/AdminCategoryEdit'
import AdminInsertParent from './screens/AdminInsertParent'
import OrderDetail from './screens/OrderDetail'

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path='/' component={Home} exact />
                    <Route path='/search/:keyword' component={Home} exact />
                    <Route path='/admin/search/:keyword' component={AdminListProducts} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/product/:id' component={ProductDetail} />
                    <Route path='/products/category/:category_id' component={Home} />
                    <Route path='/products/brand/:brand_id' component={Home} />

                    <Route path='/cart/:id?' component={Cart} />
                    <Route path='/shipping' component={Shipping} />
                    <Route path='/payment' component={Payment} />
                    <Route path='/placeorder' component={PlaceOrder} />
                    <Route path='/orders/:id' component={Order} />

                    <Route path='/orderdetails/:id' component={OrderDetail} />
                    
                    <Route path='/admin/userlist' component={AdminListUsers} />
                    <Route path='/admin/user/:id/edit' component={AdminUserEdit} />
                    <Route path='/admin/productlist' component={AdminListProducts} />
                    <Route path='/admin/categorylist' component={AdminLisCategory} />

                    <Route path='/admin/product/insert' component={AdminInsertProduct} />
                    <Route path='/admin/user/insert' component={AdminInsertUser} />
                    <Route path='/admin/category/insert' component={AdminInsertCategory} />
                    <Route path='/admin/parent/category/insert' component={AdminInsertParent} />

                    <Route path='/admin/product/:id/edit' component={AdminProductEdit} />
                    <Route path='/admin/category/:id/edit' component={AdminCategoryEdit} />
                    <Route path='/admin/orderlist' component={AdminListOrders} />

                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;

import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { listParent, deleteCategory, listCategoriesByParent } from '../actions/categoryActions'
import { useAlert } from 'react-alert'
import { MDBDataTableV5 } from 'mdbreact'

const AdminLisCategory = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const parentList = useSelector(state => state.parentList)
    const {loading, error, parents } = parentList

    const categoryByParentList = useSelector(state => state.categoryByParentList)
    const {loading: loadingCate, error: errorCate, catesParent } = categoryByParentList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, category: categoryCreated } = categoryCreate

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { success: successDelete,  error: errorDelete } = categoryDelete

    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET })
        if (userInfo && userInfo.roles[0] === 'admin') {
            dispatch(listParent())
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo, successCreate, categoryCreated])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteCategory(id))
            if(successDelete){alert.success("Delete category successfully")}
    }

    const createCateHandler = () => {
        history.push('/admin/category/insert')
    }

    const createParentHandler = () => {
        history.push('/admin/parent/category/insert')
    }

    const categoryHandler = (parentId) => {
        dispatch(listCategoriesByParent(parentId))
    }


    const setLisParent = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'category_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'categoryName',
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
        parents && parents.forEach(cate => {
            data.rows.push({
                category_id: <Button className="btn-xl" variant="blue" onClick={() => categoryHandler(cate.category_id)}>
                                    {cate.category_id}
                                    {/* <i className="fas fa-info-circle"></i> */}
                            </Button>,
                categoryName: <Button className="btn-xl" variant="blue" onClick={() => categoryHandler(cate.category_id)}>
                                    {cate.categoryName}
                                        {/* <i className="fas fa-info-circle"></i> */}
                                </Button>,
                
                actions:
                    [
                        <>
                            <LinkContainer to={`/admin/category/${cate.category_id}/edit`} className="text-decoration-none">
                                    <Button className="btn-sm" variant="light">
                                            <i className="fas fa-edit"></i>
                                    </Button>
                            </LinkContainer>
                            <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(cate.category_id)}>
                                    <i className="fas fa-trash"></i>
                            </Button>
                        </>
                    ]
                         
            })
        })
        return data
    }



    const setLisCateByParent = () => {
        const dataCate = {
            columns: [
                {
                    label: 'ID',
                    field: 'category_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'categoryName',
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
        catesParent && catesParent.forEach(cate => {
            dataCate.rows.push({
                
                 category_id: cate.category_id,
                categoryName: cate.categoryName,
                
                actions:
                    [
                        <>
                            <LinkContainer to={`/admin/category/${cate.category_id}/edit`} className="text-decoration-none">
                                    <Button className="btn-sm" variant="light">
                                            <i className="fas fa-edit"></i>
                                    </Button>
                            </LinkContainer>
                            <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(cate.category_id)}>
                                    <i className="fas fa-trash"></i>
                            </Button>
                        </>
                    ]
                         
            })
        })
        return dataCate
    }


    return (
        <>
           <Row className="align-items-center">
                <Col xl={10}>
                    <h3>Categories</h3>
                </Col>
                <Col xl={2}> 
                    {/* <Button size="sm" variant="outline-primary" onClick={createCateHandler}>
                        <i className="fas fa-plus"> Create Category</i>
                    </Button> */}
                </Col>
            </Row>
            {errorDelete && <h5><Message variant="danger">Delete failed. This category already has product or subcategory</Message></h5>}
            {loadingCreate && <h5><Loader /></h5>}
            {errorCreate && <h5><Message variant="danger">Create failed. Input lack of field</Message></h5>}
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (
                    <Row>
                        <Col sm={6}>
                            <h5>Parent Categories</h5>
                            <Button size="sm" variant="outline-primary" onClick={createParentHandler}>
                                <i className="fas fa-plus"> Create Parent Category</i>
                            </Button>
                            <MDBDataTableV5
                                data={setLisParent()}
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
                        </Col>
                        <Col sm={6}>
                        <h5>Sub Categories</h5>
                            <Button size="sm" variant="outline-primary" onClick={createCateHandler}>
                                 <i className="fas fa-plus"> Create Sub Category</i>
                            </Button>
                            <MDBDataTableV5
                                data={setLisCateByParent()}
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
                        </Col>
                    </Row>

                )
            }

        </>
    )
}

export default AdminLisCategory

import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions.js'
import { useAlert } from 'react-alert'
import { MDBDataTableV5 } from 'mdbreact'

const AdminListUsers = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const userList = useSelector(state => state.userList)
    const {loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.roles[0] === 'admin') {
            dispatch(listUsers())
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?'))
            dispatch(deleteUser(id))
            if(successDelete){alert.success("Delete user successfully")}
    }

    const createProductHandler = () => {
        history.push('/admin/user/insert')
    }


    const setListUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'user_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'userName',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'userEmail',
                    sort: 'asc'
                },
                {
                    label: 'Admin',
                    field: 'roles',
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
        users && users.data.forEach(user => {
            data.rows.push({
                user_id: user.user_id,
                userName: user.userName,
                userEmail: user.userEmail,
                roles: user.roles[0] === 'admin' ? (<i className="fas fa-check" style={{ color: "green" }}></i>
                    ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                    ),
                
                actions:
                    [
                        <>
                            <LinkContainer to={`/admin/user/${user.user_id}/edit`} className="text-decoration-none">
                                    <Button className="btn-sm" variant="light">
                                            <i className="fas fa-edit"></i>
                                    </Button>
                            </LinkContainer>
                            <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user.user_id)}>
                                    <i className="fas fa-trash"></i>
                            </Button>
                        </>
                    ]
                         
            })
        })
        return data
    }


    return (
        <>
           <Row className="align-items-center">
                <Col xl={10}>
                    <h3>Customers</h3>
                </Col>
                <Col xl={2}> 
                    <Button size="sm" variant="outline-primary" onClick={createProductHandler}>
                        <i className="fas fa-plus"> Create customers</i>
                    </Button>
                </Col>
            </Row>
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (

                    <MDBDataTableV5
                        data={setListUsers()}
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

                    // <Table striped bordered hover responsive className="table-sm">
                    //     <thead>
                    //         <tr>
                    //             <th>ID</th>
                    //             <th>NAME</th>
                    //             <th>EMAIL</th>
                    //             <th style={{ textAlign: "center" }}>ADMIN</th>
                    //             <th></th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {users.data.map(user => (
                    //             <tr key={user.user_id}>
                    //                 <td class="align-middle">{user.user_id}</td>
                    //                 <td class="align-middle">{user.userName}</td>
                    //                 <td class="align-middle">{user.userEmail}</td>
                    //                 <td class="align-middle" style={{ textAlign: "center" }} >
                    //                     {user.roles[0] === 'admin' ? (<i className="fas fa-check" style={{ color: "green" }}></i>
                    //                     ) : (
                    //                         <i className="fas fa-times" style={{ color: "red" }}></i>
                    //                     )}
                    //                 </td>
                    //                 <td class="align-middle">
                    //                     <LinkContainer to={`/admin/user/${user.user_id}/edit`} className="text-decoration-none">
                    //                         <Button className="btn-sm" variant="light">
                    //                             <i className="fas fa-edit"></i>
                    //                         </Button>
                    //                     </LinkContainer>
                    //                     <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user.user_id)}>
                    //                         <i className="fas fa-trash"></i>
                    //                     </Button>
                    //                 </td>
                    //             </tr>
                    //         ))}

                    //     </tbody>
                    // </Table>

                )
            }

        </>
    )
}

export default AdminListUsers

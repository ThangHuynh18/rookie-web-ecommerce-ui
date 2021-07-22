import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions.js'

const AdminListUsers = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading: loading, error: error, users } = userList

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
    }

    return (
        <>
            <h3>Users</h3>
            {
                loading ? <h5><Loader /></h5> : error ? <h5><Message variant="danger">{error}</Message></h5> : (

                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th style={{ textAlign: "center" }}>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(user => (
                                <tr key={user.user_id}>
                                    <td class="align-middle">{user.user_id}</td>
                                    <td class="align-middle">{user.userName}</td>
                                    <td class="align-middle">{user.userEmail}</td>
                                    <td class="align-middle" style={{ textAlign: "center" }} >
                                        {user.roles[0] === 'admin' ? (<i className="fas fa-check" style={{ color: "green" }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: "red" }}></i>
                                        )}
                                    </td>
                                    <td class="align-middle">
                                        <LinkContainer to={`/admin/user/${user.user_id}/edit`} className="text-decoration-none">
                                            <Button className="btn-sm" variant="light">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user.user_id)}>
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

export default AdminListUsers

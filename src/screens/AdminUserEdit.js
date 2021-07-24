import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions.js";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const AdminUserEdit = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.data.userName);
        setEmail(user.data.userEmail);
        setPassword(user.data.userPassword);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      userName: name,
      userEmail: email,
      userPassword: password,
    };
    dispatch(updateUser(data));
  };

  return (
    <>
      <Link className="my-3 text-decoration-none" to="/admin/userlist">
        <i class="fas fa-arrow-left"></i> Go back
      </Link>
      <FormContainer>
        <h3>Edit User</h3>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <span>
            <Message variant="danger">{errorUpdate}</Message>
          </span>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <span>
            <Message variant="danger">{error}</Message>
          </span>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" style={{ marginTop: "8px" }}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" style={{ marginTop: "8px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required
              ></Form.Control>
            </Form.Group>
            <div className="d-grid gap-2" style={{ marginTop: "16px" }}>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminUserEdit;

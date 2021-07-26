import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getCategoryDetails, updateCategory } from "../actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../constants/categoryConstants";

const AdminUserEdit = ({ match, history }) => {
  const cateId = match.params.id;

  const [name, setName] = useState("");
  const [parent, setParent] = useState(0);

  const dispatch = useDispatch();

  const parentList = useSelector(state => state.parentList)
    const {loading: loadingParent, error: errorParent, parents } = parentList

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/categorylist");
    } else {
      if (!category) {
        dispatch(getCategoryDetails(cateId));
      } else {
        setName(category.data.categoryName);
        setParent(category.data.parent_id);
      }
    }
  }, [dispatch, history, cateId, category, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      categoryName: name,
      parent_id: parent
      
    };
    dispatch(updateCategory(data));
  };

  return (
    <>
      <Link className="my-3 text-decoration-none" to="/admin/categorylist">
        <i class="fas fa-arrow-left"></i> Go back
      </Link>
      <FormContainer>
        <h3>Edit Category</h3>
        {loadingUpdate && <Loader />}{errorUpdate && ( <span><Message variant="danger">{errorUpdate}</Message></span>)}
        {loading ? ( <Loader />) : error ? ( <span><Message variant="danger">{error}</Message> </span>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Categoy Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)} required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="parent" style={{ marginTop: "8px" }}>
                        <Form.Label>Parent</Form.Label>
                         <select className="form-control" id="category" value={parent} onChange={(e) => setParent(e.target.value)}>
                                {  loadingParent ? <h5><Loader /></h5> : errorParent ? <h5><Message variant="danger">{errorParent}</Message></h5> : 
                                    parents.map(item =>  <option key={item.category_id} value={item.category_id}>{item.categoryName}</option>)}
                         </select>
                        
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

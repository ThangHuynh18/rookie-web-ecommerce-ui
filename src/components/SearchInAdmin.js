import React, { useState } from 'react'
import {Form , FormControl, Button} from "react-bootstrap";

const SearchInAdmin = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/admin/search/${keyword}`)
        } else {
            history.push('/admin/productlist')
        }
    }
    return (
        <>
            <Form className="d-flex" onSubmit={searchHandler}>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button Button variant="outline-light" type="submit">Search</Button>
            </Form>
        </>
    )
}

export default SearchInAdmin

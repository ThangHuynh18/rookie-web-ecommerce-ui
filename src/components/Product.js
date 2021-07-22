import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



const Product = ({product}) => {
    // const imageList = useSelector(state => state.imageList)
    // const { loading, error, images } = imageList
    // console.log(imageList)

    return (
        <Card className="my-3 p-3 rounded">
            
            <Link to={`/product/${product.product_id}`}>
                <Card.Img variant="top" src={product.imageDTOS[0].imageLink} alt={product.productName} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.product_id}`} className="text-decoration-none">
                    <Card.Title as='div'>
                        <h5>{product.productName}</h5>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                   {/* <Rating 
                        value={product.rating}
                        text={` ${product.numReviews} reviews`}/>  */}
                </Card.Text>

                <Card.Text as='h4'>${product.productPrice}</Card.Text>

                <Link to={`/product/${product.product_id}`}>
                    <Button size="sm" variant="outline-primary">View more</Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
}

export default Product
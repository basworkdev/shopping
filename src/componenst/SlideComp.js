import React , {useState , useEffect} from "react";
import { Carousel } from 'react-bootstrap';
export default function SlideComp(props) {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="../image/slide1.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://s3-ap-southeast-1.amazonaws.com/socialgiver-media-lifestyle/wp-content/uploads/2016/03/31134608/camp1.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://s3-ap-southeast-1.amazonaws.com/socialgiver-media-lifestyle/wp-content/uploads/2016/03/31134608/camp1.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
        </>
    )
}
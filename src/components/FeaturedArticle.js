import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Octicon, { Star } from '@primer/octicons-react'

class FeaturedArticle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container >
                <Row>
                    <Col md={{ span: 4, order: 12 }} sm={{ span: 12, order: 0 }} xs={{ span: 12, order: 0 }}>
                        <Row>
                            <h3>Featured stories</h3>
                        </Row>
                        <Row>
                            <h6>Today’s best stories, picked by our editors.</h6>
                        </Row>
                    </Col>
                    <Col md={{ span: 8, order: 0 }} sm={{ span: 12, order: 12 }} xs={{ span: 12, order: 12 }}>
                        <Row>
                            <Image src="https://miro.medium.com/max/3000/1*bVWy9X9vq8EYjt5ysP62gg.jpeg" fluid></Image>
                        </Row>
                        <Row>
                            <h1 style={{ fontSize: 3 + "vw" }}>The Healthy Way to Write About Pain</h1>
                        </Row>
                        <Row>
                            <h6>Ask the questions you were too busy, or scared, to consider in the moment</h6>
                        </Row>
                        <Row>
                            <Col md={{ span: 1, order: 0 }}>
                                <Image src="https://miro.medium.com/fit/c/80/80/1*nllGYSR4t-ORDtSOiHJacg.jpeg" roundedCircle height="40px" width="40px"></Image>
                            </Col>
                            <Col md={{ span: 11, order: 11 }}>
                                <Row>
                                    <p style={{ fontSize: 14 + "px" }}> Eileen Pollack in Human Parts</p>
                                </Row>
                                <Row>
                                    <p style={{ fontSize: 14 + "px" }}> Nov 14 · 5 min read <Octicon icon={Star} size="small" verticalAlign="middle"></Octicon></p>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default FeaturedArticle;
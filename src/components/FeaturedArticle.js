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
        this.article = props.article.article;
        this.author = props.article.articleAuthor;
    }
    render() {
        return (
            <Container >
                <Row>
                    <Col md={{ span: 4, order: 12 }} sm={{ span: 12, order: 0 }} xs={{ span: 12, order: 0 }}>
                        <Row style={{ marginLeft: 30 + "px" }}  >
                            <h3>Featured stories</h3>
                        </Row>
                        <Row style={{ marginLeft: 30 + "px", color: "#999", fontSize: 12 + "px" }}>
                            <h6>Today’s best stories, picked by our editors.</h6>
                        </Row>
                    </Col>
                    <Col md={{ span: 8, order: 0 }} sm={{ span: 12, order: 12 }} xs={{ span: 12, order: 12 }}>
                        <Row>
                            <Image src={(this.article.pic) ? this.article.pic : ""} width="100%"></Image>
                        </Row>
                        <Row style={{ marginTop: 11 + "px" }}>
                            <h1 style={{ fontSize: 3 + "vw" }}>{(this.article.title) ? this.article.title : ""}</h1>
                        </Row>
                        <Row>
                            <h6 style={{ color: "#999" }}>{(this.article.subTitle) ? this.article.subTitle : ""}</h6>
                        </Row>
                        <Row>
                            <Col md={{ span: 1, order: 0 }} style={{ padding: 0 }}>
                                <Image src={(this.author.pic) ? this.author.pic : ""} roundedCircle height="40px" width="40px"></Image>
                            </Col>
                            <Col md={{ span: 11, order: 11 }}>
                                <Row>
                                    <p style={{ fontSize: 12 + "px", marginBottom: 0 }}> {(this.author.name) ? this.author.name : ""} in Human Parts</p>
                                </Row>
                                <Row>
                                    <p style={{ fontSize: 12 + "px" }}> Nov 14 · {(this.article.readingTime) ? this.article.readingTime : ""} min read <Octicon icon={Star} size="small" verticalAlign="middle"></Octicon></p>
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
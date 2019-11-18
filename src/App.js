import React from "react";
import "./App.css";
import FeaturedArticle from "./components/FeaturedArticle";
import TopicList from "./components/topicList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    return (
        <Container>
            {/* Nav Bar */}
            <Row></Row>
            {/* Featured */}
            <Row>
                <Col>
                    <FeaturedArticle />
                </Col>
            </Row>
            {/* Latest */}
            <Row>
                <TopicList></TopicList>
            </Row>
        </Container>

    );
}

export default App;

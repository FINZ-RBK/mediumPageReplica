import React from "react";
import "./App.css";
import FeaturedArticle from "./components/FeaturedArticle";
import TopicList from "./components/topicList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthorizationBox from "./components/AuthorizationBox";
function App() {
  return (
    <Container>
      {/* Nav Bar */}
      <AuthorizationBox></AuthorizationBox>
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

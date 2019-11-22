import React from "react";
import "./App.css";
import FeaturedArticle from "./components/FeaturedArticle";
import TopicList from "./components/topicList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import AuthorizationBox from "./components/AuthorizationBox";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.farticle
    };
  }
  componentDidMount() {
    var that = this;
    axios.get(`/articles/getFeatured`).then(res => {
      that.setState({ article: res.data });
    });
  }
  componentDidUpdate(prev) {
    if (prev.article !== this.props.article) {
      this.fetchData();
    }
  }
  render() {
    return (
      <Container>
        {/* <AuthorizationBox></AuthorizationBox> */}
        {/* Nav Bar */}
        <Row>
          <Col><iframe
            allowfullscreen
            scrolling="no"
            seamless="seamless"
            src={
              "https://navbar-module.herokuapp.com/featured/"
            }
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe></Col>

        </Row>
        {/* Featured */}
        <Row>
          <Col>
            <Row>
              <Col><FeaturedArticle
                article={this.state.article ? this.state.article : ""}
              ></FeaturedArticle></Col>

            </Row>
            <Row style={{ marginTop: 15 + "px" }}>
              <Col md={8}>
                <TopicList></TopicList>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Col>
        </Row>
        {/* Latest */}

      </Container>
    );
  }
}

export default App;

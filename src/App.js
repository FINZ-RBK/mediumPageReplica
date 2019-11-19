import React from "react";
import "./App.css";
import FeaturedArticle from "./components/FeaturedArticle";
import TopicList from "./components/topicList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.farticle
        }

    }
    componentDidMount() {
        var that = this;
        axios.get(`/articles/getFeatured`)
            .then(res => {
                console.log('data from axios', res.data)
                that.setState({ article: res.data });
            })
    }
    componentDidUpdate(prev) {
        if (prev.article !== this.props.article) {
            this.fetchData();
        }
    }
    render() {
        console.log('changing states', this.state.article)
        return (
            <Container>
                {/* Nav Bar */}
                <Row></Row>
                {/* Featured */}
                <Row>
                    <Col>
                        <FeaturedArticle article={(this.state.article) ? this.state.article : ""} ></FeaturedArticle>
                    </Col>
                </Row>
                {/* Latest */}
                <Row>
                    <TopicList></TopicList>
                </Row>
            </Container>

        );
    }
}

export default App;

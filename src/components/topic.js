import React from "react";
import styled from "styled-components";
import axios from "axios";

import { Avatar, Flex } from "@primer/components";

const A = styled.a`
  font-size: 0.8em;
  color: #4d4b44;
  text-align: left;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  word-wrap: break-word;
`;

const A2 = styled.a`
  font-size: 0.8em;
  margin: 0em;
  color: #4d4b44;
  text-align: left;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  word-wrap: break-word;
`;
const DIV = styled.div`

color:#4d4b44;
font-weight: bold
  font-size: 1.5em;
  text-align: left;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  word-wrap: break-word;
`;
const Container = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  height: auto;
  position: relative;
`;
const TopicText = styled.div`
  width: 80%;
`;

const TopicImage = styled.div`
  width: 20%;
`;
const DIV2 = styled.div`
  font-size: 1em;
  color: #8f8c83;
  text-align: left;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  word-wrap: break-word;
`;

const EmptyDiv = styled.div`
  width: 100%;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
`;
const EmptyDiv2 = styled.div`
  display: flex;
  height: auto;
  position: relative;
  width: 30%;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
`;

const Image = styled.img`
float: right;
vertical-align: text-bottom;
  margin: 0.5em;
  padding: 0.25em 1em;
  height:5%
  width:5%;`;

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      lastItemID: 0,
      autherID: 0,
      category: "non"
    };
  }

  componentDidMount() {
    var that = this;
    axios
      .get("/articles/getUser", {
        params: {
          id: this.props.data["authorId"]
        }
      })
      .then(function (response) {
        that.setState({
          autherID: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/articles/getCategory", {
        params: {
          id: this.props.data["categoryId"]
        }
      })
      .then(function (response) {
        that.setState({
          category: response.data
        });
        // console.log(that.state.autherID, "data");
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      data: this.props.data
    });
  }
  render() {
    return (
      <Container>
        <TopicText>
          <DIV>
            <a
              style={{ color: "#4d4b44" }}
              href={`https://meduim-replica.herokuapp.com/?id=${this.state.data["id"]}`}
            >
              {this.state.data["title"]}
            </a>
          </DIV>
          <DIV2>{this.state.data["subTitle"]}</DIV2>
          <EmptyDiv>
            <A ref>{this.state.autherID} </A> <A2>{"in"}</A2>{" "}
            <A2 ref>{this.state.category}</A2>
            <Image
              src={
                "https://www.freepngimg.com/download/instagram/60239-like-icons-bookmark-button-computer-facebook-instagram.png"
              }
            ></Image>
          </EmptyDiv>
          <EmptyDiv>
            <Flex>
              {}
              <A style={{ color: "#8f8c83" }}>
                {" "}
                {new Date(this.state.data["createdAt"]).toDateString()}{" "}
              </A>{" "}

              <A2 style={{ color: "#8f8c83" }}>
                {"  - "} {this.state.data["readingTime"] + "  min read"}
              </A2>
            </Flex>
          </EmptyDiv>
        </TopicText>
        <TopicImage>
          <div>
            <Avatar mb={4} src={this.state.data["pic"]} size={140}></Avatar>
          </div>
        </TopicImage>
      </Container>
    );
  }
}

export default Topic;

import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import {
  AvatarPair,
  Avatar,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  Link,
  Tooltip
} from "@primer/components";
import { textAlign } from "styled-system";

const A = styled.a`
  font-size: 1em;
  margin: 0em 0em 0em 1.2em;
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
  font-size: 1em;
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
  margin: .2em .2em .2em 0.8em;
  padding: 0.25em 0.9em;
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
  width: 60%;
`;

const TopicImage = styled.div`
  width: 40%;
`;
const DIV2 = styled.div`
  font-size: 1em;
  margin: 0.8em;
  color: #8f8c83;
  padding: 0.25em 2em;
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
  margin: 0.5em;
  padding: 0.25em 1em;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
`;
const EmptyDiv2 = styled.div`
  display: flex;
  height: auto;
  position: relative;
  width: 30%;
  margin: 0.5em;
  padding: 0.25em 1em;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
`;

const Image = styled.img`
float: right;
vertical-align: text-bottom;
  margin: 0.5em;
  padding: 0.25em 1em;
  height:5%
  width:5%;`;

const MainImage = styled.img`
vertical-align: text-bottom;
  margin: 0.5em;
  padding: 0.25em 1em;
  height:120px
  width:120px;`;

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <TopicText>
          <DIV>What is Lorem Ipsum?</DIV>
          <DIV2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has
          </DIV2>
          <EmptyDiv>
            <A ref>{"user"} </A> <A2>{"in"}</A2> <A2 ref>{"category"}</A2>
            <Image
              src={
                "https://www.freepngimg.com/download/instagram/60239-like-icons-bookmark-button-computer-facebook-instagram.png"
              }
            ></Image>
          </EmptyDiv>
          <EmptyDiv>
            <Flex>
              <A style={{ color: "#8f8c83" }}> Date </A> {" . "}
              <A2 style={{ color: "#8f8c83" }}> Times </A2>
            </Flex>
          </EmptyDiv>
        </TopicText>
        <TopicImage>
          <EmptyDiv2>
            <Avatar
              mb={4}
              src="https://avatars.githubusercontent.com/primer"
              size={140}
            ></Avatar>
          </EmptyDiv2>
        </TopicImage>
      </Container>
    );
  }
}

export default Topic;

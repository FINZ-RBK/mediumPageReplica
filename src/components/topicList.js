import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Topic from "./topic";
import { Box, Button, Heading, Text } from "@primer/components";

const Div = styled.div`
  font-size: 0.8em;
  margin: 0.5em;
  width:100%;
  padding: 0.25em 1em;
   display: inline
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  font-family: Scheherazade, Arial, Helvetica, sans-serif;
  word-wrap: break-word;
`;

class TopicList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <Div>
        <p>latest</p>
        <Topic></Topic>{" "}
      </Div>
    );
  }
}

export default TopicList;

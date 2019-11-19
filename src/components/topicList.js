import React from "react";
import styled from "styled-components";
import Topic from "./topic";
import axios from "axios";
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
const UL = styled.ul`
  list-style-type: none;
`;

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      lastItemID: 0
    };
    this.scroleListner = window.addEventListener("scroll", e => {
      this.handelScroll(e);
    });
  }

  handelScroll(e) {
    const lastElement = document.querySelector("ul >li:last-child");
    const lastChildOffset = lastElement.offsetTop - 20;
    const pageOffset = window.pageYOffset;
    const innPageOffSet = window.innerHeight;
    const allPageOffSet = pageOffset + innPageOffSet;
    console.log(this.state.lastItemID);
    if (lastChildOffset < allPageOffSet) {
      this.state.page += 1;
      this.getArticals();
      console.log(this.state.lastItemID);
    }
  }
  getArticals() {
    var that = this;
    var id = this.state.lastItemID;
    if (this.state.page <= 1) {
      id = 1;
    }
    axios
      .get("http://localhost:3004/get10Articals", {
        params: {
          id: 1
        }
      })
      .then(function(response) {
        // console.log(response.data);
        that.setState({
          data: [...that.state.data, ...response.data],
          lastItemID: response.data[response.data.length - 1]["id"]
        });
        // console.log(that.state.lastItemID, "LastItem");
      })
      .catch(function(error) {
        // console.log(error);
      });
  }
  componentDidMount() {
    var that = this;
    var id = this.state.lastItemID;
    if (this.state.page <= 1) {
      id = 1;
    }
    this.getArticals();
  }
  render() {
    const listItems = this.state.data.map(obj => {
      return (
        <li>
          <Topic data={obj}></Topic>
        </li>
      );
    });
    return (
      <di>
        <p>latest</p>
        <UL class="latest">
          {listItems}
          <li></li>
        </UL>
      </di>
    );
  }
}

export default TopicList;

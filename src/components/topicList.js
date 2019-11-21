import React from "react";
import styled from "styled-components";
import Topic from "./topic";
import axios from "axios";
import { fontWeight } from "styled-system";

const UL = styled.ul`
  list-style-type: none;
`;
const Container = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  height: auto;
  position: relative;
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
    const lastChildOffset = lastElement.offsetTop - 10;
    const pageOffset = window.pageYOffset;
    const innPageOffSet = window.innerHeight;
    const allPageOffSet = pageOffset + innPageOffSet;
    if (lastChildOffset < allPageOffSet) {
      this.setState({
        page: this.state.page + 1
      });
      this.getArticals();
    }
  }
  getArticals() {
    var that = this;
    var id = this.state.lastItemID;
    if (this.state.page == 1) {
      this.state.lastItemID = 1;
    }
    axios
      .get("/articles/get10Articals", {
        params: {
          id: that.state.lastItemID || 0
        }
      })
      .then(function(response) {
        that.setState({
          data: [...that.state.data, ...response.data],
          lastItemID: response.data[response.data.length - 1]["id"]
        });
      })
      .catch(function(error) {
        console.log(error);
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
      <Container>
        <UL class="latest">
          <Container style={{ fontWeight: "bold" }}>latest</Container>
          <hr />
          {listItems}
          <li></li>
        </UL>
      </Container>
    );
  }
}

export default TopicList;

import React from "react";
import styled from "styled-components";
import Topic from "./topic";
import axios from "axios";
import sevis from "./services";
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
    const lastChildOffset = lastElement.offsetTop - 20;
    const pageOffset = window.pageYOffset;
    const innPageOffSet = window.innerHeight;
    const allPageOffSet = pageOffset + innPageOffSet;
    if (lastChildOffset < allPageOffSet) {
      // console.log(lastChildOffset);
      // console.log(innPageOffSet);
      // console.log(lastChildOffset);
      this.setState({
        page: this.state.page + 1
      });
      this.getArticals();
    }
  }
  getArticals() {
    console.log(this.state.lastItemID);
    var that = this;
    var id = this.state.lastItemID;
    if (this.state.page === 1) {
      this.state.lastItemID = 1;
    }
    axios
      .get("/articles/get10Articals", {
        params: {
          id: that.state.lastItemID || 0
        }
      })
      .then(function (response) {
        console.log(response.data[response.data.length - 1]["id"], "befor");
        that.lastItemID = response.data[response.data.length - 1]["id"];
        that.setState({
          data: [...that.state.data, ...response.data],
          lastItemID: response.data[response.data.length - 1]["id"]
        });
        console.log(response.data[response.data.length - 1]["id"], "after");
      })
      .catch(function (error) {
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
        <li key={obj.id}>
          <Topic data={obj}></Topic>
        </li>
      );
    });
    return (
      <Container>
        <UL className="latest">
          <li></li>
          <Container style={{ fontWeight: "bold" }}>LATEST</Container>
          <hr />
          {listItems}
        </UL>
      </Container>
    );
  }
}

export default TopicList;

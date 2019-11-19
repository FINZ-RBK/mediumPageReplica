import React from "react";
import styled from "styled-components";
import Topic from "./topic";
import axios from "axios";

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
    const lastChildOffset = lastElement.offsetTop - 10;
    const pageOffset = window.pageYOffset;
    const innPageOffSet = window.innerHeight;
    const allPageOffSet = pageOffset + innPageOffSet;
    console.log(this.state.lastItemID, "this is after update");
    if (lastChildOffset < allPageOffSet) {
      this.setState({
        page: this.state.page + 1
      });
      this.getArticals();
      console.log(this.state.page, "this is after update");
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
          id: that.state.lastItemID
        }
      })
      .then(function (response) {
        // console.log(response.data);
        that.setState({
          data: [...that.state.data, ...response.data],
          lastItemID: response.data[response.data.length - 1]["id"]
        });
        // console.log(that.state.lastItemID, "LastItem");
      })
      .catch(function (error) {
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

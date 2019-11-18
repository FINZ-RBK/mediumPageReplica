/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import "../public/style.css";
// 'https://young-river-75124.herokuapp.com/stream'
class Responses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      showList: false
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.updateContent();
  }

  updateContent() {
    const that = this;
    this.eventSource = new EventSource(
      // 'https://young-river-75124.herokuapp.com/stream'
      "http://localhost:3003/stream"
    );
    this.eventSource.onopen = () => {
      console.log("es open");
    };
    this.eventSource.onerror = () => {
      console.log("no response");
    };
    this.eventSource.onmessage = result => {
      // console.log("dataaaaa",JSON.parse(result.data));
      // const { articles } = JSON.parse(result.data);
      // console.log('result: ', articles);
      that.setState({ comments: JSON.parse(result.data) });
    };
  }

  render() {
    return this.state.comments.length > 0 ? (
      <div>
        <a id="commentsBox" className="commentsBox">
          <button
            onClick={() => this.setState({ showList: true })}
            className="responsesBtn"
          >
            See responses
          </button>
        </a>
        {this.state.showList && <List comments={this.state.comments} />}
      </div>
    ) : null;
  }
}
ReactDOM.render(<Responses />, document.getElementById("responses"));

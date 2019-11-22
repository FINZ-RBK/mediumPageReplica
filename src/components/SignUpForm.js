import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { stat } from "fs";
import { textAlign } from "styled-system";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      show: false,
      error: ""
    };
    this.user = { name: "", email: "", password: "" };
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
    this.handleClickSignIn = this.handleClickSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signinSubmit = this.signinSubmit.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    window.location.reload(false);
  }

  handleChange(event) {
    var name = event.target.name;
    this.user[name] = event.target.value;
  }

  handleClickSignIn() {
    var state = !this.state.signIn;
    this.setState({
      signIn: state
    });
  }

  handleClickSignUp() {
    var that = this;
    this.setState({
      show: true
    });
    axios
      .post("/users/signup", this.user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("response: ", res);
        that.setState({ show: false });
        // that.props.handleClose();
        that.handleResponse(res);
        that.refreshPage();
        return res;
      })
      .catch(err => {
        console.log(err);
        that.setState({ show: false });
        this.setState({ error: err });
      });
  }
  signinSubmit() {
    var that = this;
    this.setState({
      show: true
    });
    axios
      .post("/users/login", this.user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("response: ", res);
        that.setState({ show: false });
        console.log(res.data.errors);
        that.refreshPage();
        this.handleResponse(res);
        // return res;
      })
      .catch(err => {
        console.log(err);
        that.setState({ show: false });
        // this.setState({ error: err });
      });
  }

  handleResponse(response) {
    if (response.status === 203) {
      this.setState({ error: response.data.errors[0].msg });
    } else if (response.status === 201) {
      //that.props.handleClose();
      this.setState({ error: response.data.errors[0] });
    } else if (response.status === 200) {
      console.log("Success");
    }
  }

  render() {
    var loadingErr = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ReactLoading
          type="spin"
          width={this.state.show ? "70px" : "0px"}
          color="rgba(3, 168, 124, 1)"
        ></ReactLoading>
        <p id="error" className="error">
          {this.state.error}
        </p>
      </div>
    );
    return this.state.signIn ? (
      <div>
        <h4
          style={{
            fontWeight: "500px",
            fontSize: "28px",
            fontFamily: "medium-marketing-display-font",
            color: "rgb(0,0,0,0.84)",
            padding: "8px"
          }}
        >
          Join Meduim.
        </h4>
        {loadingErr}
        <input
          onChange={this.handleChange}
          required
          type="text"
          id="fname"
          name="name"
          placeholder="Full name"
        ></input>
        <input
          onChange={this.handleChange}
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
        ></input>
        <input
          onChange={this.handleChange}
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        ></input>
        <input type="submit" onClick={this.handleClickSignUp}></input>
        <p>
          Already have an account?
          <span className="signin" onClick={this.handleClickSignIn}>
            Sign in
          </span>
        </p>
        <p className="summary" style={{ paddingTop: "20px" }}>
          To make Medium work, we log user data and share it with service
          providers. Click “Sign Up” above to accept Medium’s
          <a
            target="blank"
            rel="noopener"
            href="https://medium.com/policy/medium-terms-of-service-9db0094a1e0f"
          >
            Terms of Service
          </a>
          &amp;
          <a
            target="blank"
            rel="noopener"
            href="https://medium.com/policy/medium-privacy-policy-f03bf92035c9"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    ) : (
      <div>
        <h4
          style={{
            fontSize: "28px",
            fontFamily: "medium-marketing-display-font",
            color: "rgb(0,0,0,0.84)",
            padding: "8px"
          }}
        >
          Welcome back.
        </h4>
        <p
          style={{
            fontFamily:
              " medium-content-sans-serif-font,Lucida Grande,Lucida Sans Unicode,Lucida Sans",
            fontSize: "18px",
            color: "rgb(0,0,0,0.54)"
          }}
        >
          Sign in to get personalized story
          <br />
          recommendations, follow authors and topics you <br /> love, and
          interact with stories.
        </p>
        {loadingErr}
        <input
          onChange={this.handleChange}
          required
          type="email"
          id="semail"
          name="email"
          placeholder="Email address"
        ></input>
        <input
          onChange={this.handleChange}
          required
          type="password"
          id="spassword"
          name="password"
          placeholder="Password"
        ></input>
        <input type="submit" onClick={this.signinSubmit}></input>
        <p>
          No account?
          <span className="signin" onClick={this.handleClickSignIn}>
            Create one!
          </span>
        </p>
        <p className="summary">
          To make Medium work, we log user data and share it with service
          providers. Click “Sign In” above to accept Medium’s
          <a
            target="blank"
            rel="noopener"
            href="https://medium.com/policy/medium-terms-of-service-9db0094a1e0f"
          >
            Terms of Service
          </a>
          &amp;
          <a
            target="blank"
            rel="noopener"
            href="https://medium.com/policy/medium-privacy-policy-f03bf92035c9"
          >
            Privacy Policy.
          </a>
        </p>
      </div>
    );
  }
}
export default Form;

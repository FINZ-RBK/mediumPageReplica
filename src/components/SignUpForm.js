import React, { Component } from "react";
import axios from "axios";
import Loading from "react-loading-bar";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      show: true,
      error: ""
    };
    this.handleClickSignIn = this.handleClickSignIn.bind(this);
  }

  handleClickSignIn() {
    var state = !this.state.signIn;
    this.setState({
      signIn: state
    });
    console.log(this.state.signIn);
  }

  handleClickSignUp() {
    axios
      .post(`/sign_up`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(err => {});
  }

  render() {
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
        <Loading show={this.state.show} color="red"></Loading>
        <p id="error" className="error" value={this.state.error}></p>
        <input
          required
          type="text"
          id="fname"
          name="firstname"
          placeholder="Full name"
        ></input>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
        ></input>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        ></input>
        <input type="submit"></input>
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
        <input
          required
          type="email"
          id="semail"
          name="s_email"
          placeholder="Email address"
        ></input>
        <input
          required
          type="password"
          id="spassword"
          name="s_password"
          placeholder="Password"
        ></input>
        <input type="submit"></input>
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
            Privacy Policy
          </a>
          .
        </p>
      </div>
    );
  }
}
export default Form;

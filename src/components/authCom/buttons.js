import React, { Component } from 'react';
import './app.css';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

class Login extends Component {
    render() {
        const responseFacebook = (response) => {
            console.log(response);
        }
        const responseGoogle = (response) => {
            console.log(response);
        }

        return (
            <div className="App">
                <h1>Facebook and Google Login</h1>

                <FacebookLogin
                    appId="770865070096346"
                    autoload={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    icon="fa-facebook"
                />
                <br/>
                <br/>

                <GoogleLogin
                    clientId="1057173760884-0vdbk7dlpi6j144j0986m1na12k970of.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
        )
    }
}
export default Login;

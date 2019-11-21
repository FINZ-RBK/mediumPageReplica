import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.get(`/articles/getFeatured`)
    .then(res => {
        console.log('data from axios', res.data)
        ReactDOM.render(<App farticle={res.data} />, document.getElementById("root"));

    }).catch(() => {
        console.log('not rendoering');
    })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';

class Proxy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello From Proxy!</h1>
      </div>
    );
  }
}

ReactDOM.render(<Proxy />, document.getElementById('proxy'));

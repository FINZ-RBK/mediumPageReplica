/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/Navbar1.jsx';
import '../public/style.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        email: '',
        pic: ''
      }
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.updateContent();
  }

  updateContent() {
    const that = this;
    this.eventSource = new EventSource(
      'https://young-hamlet-30035.herokuapp.com/stream'
      // `http://localhost:3001/stream`
    );
    this.eventSource.onopen = () => {
      console.log('es open');
    };
    this.eventSource.onerror = () => {
      console.log('no response');
    };
    this.eventSource.onmessage = (result) => {
      console.log(JSON.parse(result.data)[0].name);
      const { name, pic, email } = JSON.parse(result.data)[0];
      that.setState({ data: { name, pic, email } });
    };
  }

  render() {
    console.log(this.state.data);
    return this.state.data.name.length === 0 ? null : (
      <Navbar1 data={this.state.data} />
    );
  }
}
ReactDOM.render(<Navbar />, document.getElementById('navbar'));

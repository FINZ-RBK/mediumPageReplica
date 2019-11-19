/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/Footer.jsx';
import All from './components/All.jsx';
import '../public/style.css';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      arts: []
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.updateContent();
  }

  updateContent() {
    const that = this;
    this.eventSource = new EventSource(
      'https://afternoon-hamlet-52294.herokuapp.com/stream'
    );
    this.eventSource.onopen = () => {
      console.log('es open');
    };
    this.eventSource.onerror = () => {
      console.log('no response');
    };
    this.eventSource.onmessage = (result) => {
      // console.log('what i recived is ', JSON.parse(result.data));
      const { users } = JSON.parse(result.data);
      const { articles } = JSON.parse(result.data);
      that.setState({ users: users, arts: articles });
    };
  }

  render() {
    // console.log("in the index, users are: ", this.state.users);
    // console.log("in the index, arts are: ", this.state.arts);
    return this.state.users.length ? (
      <div>
        <div className='RecComp'>
          <div className='RECAall'>
            <div className='RECindex'>
              <All users={this.state.users} arts={this.state.arts} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    ) : null;
  }
}

ReactDOM.render(<Recommendation />, document.getElementById('recommendation'));

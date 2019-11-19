/* eslint-disable import/extensions */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../public/style.css';

class Navbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
      // email: this.props.email,
      // pic: this.props.pic
    };
    // this.updateContent = this.updateContent.bind(this);
  }

  // componentDidMount() {
  //   this.updateContent();
  // }

  // updateContent() {
  //   const that = this;
  //   this.eventSource = new EventSource(
  //     'https://young-hamlet-30035.herokuapp.com/stream'
  //   );
  //   this.eventSource.onopen = () => {
  //     console.log('es open');
  //   };
  //   this.eventSource.onerror = () => {
  //     console.log('no response');
  //   };
  //   this.eventSource.onmessage = (result) => {
  //     console.log(result);
  //     console.log(JSON.parse(result.data));
  //     // example
  //     const { email } = JSON.parse(result.data)[0];
  //     console.log(email);
  //     that.setState({ text: email });
  //   };
  // }

  render() {
    return (
      <div>
        <div className='container'>
          <Navbar bg='light' expand='lg'>
            <Navbar.Brand href='#'>
              <svg width='35' height='35' viewBox='5 5 35 35' class='q'>
                {' '}
                <path d='M5 40V5h35v35H5zm8.56-12.63c0 .56-.03.69-.32 1.03L10.8 31.4v.4h6.97v-.4L15.3 28.4c-.29-.34-.34-.5-.34-1.03v-8.95l6.13 13.36h.71l5.26-13.36v10.64c0 .3 0 .35-.19.53l-1.85 1.8v.4h9.2v-.4l-1.83-1.8c-.18-.18-.2-.24-.2-.53V15.94c0-.3.02-.35.2-.53l1.82-1.8v-.4h-6.47l-4.62 11.55-5.2-11.54h-6.8v.4l2.15 2.63c.24.3.29.37.29.77v10.35z' />{' '}
              </svg>{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <Nav.Item>
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 25 25'
                    className='navBarIcon'
                  >
                    <path d='M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z' />
                  </svg>
                </Nav.Item>
                <Nav.Item>
                  <svg
                    width='30'
                    height='30'
                    viewBox='-293 409 25 25'
                    className='navBarIcon'
                  >
                    <path d='M-273.33 423.67l-1.67-1.52v-3.65a5.5 5.5 0 0 0-6.04-5.47 5.66 5.66 0 0 0-4.96 5.71v3.41l-1.68 1.55a1 1 0 0 0-.32.74V427a1 1 0 0 0 1 1h3.49a3.08 3.08 0 0 0 3.01 2.45 3.08 3.08 0 0 0 3.01-2.45h3.49a1 1 0 0 0 1-1v-2.59a1 1 0 0 0-.33-.74zm-7.17 5.63c-.84 0-1.55-.55-1.81-1.3h3.62a1.92 1.92 0 0 1-1.81 1.3zm6.35-2.45h-12.7v-2.35l1.63-1.5c.24-.22.37-.53.37-.85v-3.41a4.51 4.51 0 0 1 3.92-4.57 4.35 4.35 0 0 1 4.78 4.33v3.65c0 .32.14.63.38.85l1.62 1.48v2.37z' />
                  </svg>
                </Nav.Item>
                <NavDropdown
                  title={
                    <div>
                      <img
                        className='navbar-img'
                        src={this.state.data.pic}
                        alt='user picture'
                      />
                    </div>
                  }
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    <div class='nameWithPhoto'>
                      <img
                        id='dropdown-img'
                        width='35px'
                        src={this.state.data.pic}
                      />
                      <span class='nameAndUsername'>
                        <span id='dropdown-name'> {this.state.data.name} </span>
                        <span id='dropdown-email'>
                          {this.state.data.email}{' '}
                        </span>
                      </span>
                      <br />
                    </div>
                    <span id='member'>Become a member</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    New Story
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Stories
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Series
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Medium Partner Program
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Bookmarks
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Publications
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Customize your interests
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Setting
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Help
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='nav-dropdown-item active'
                    href='#'
                  >
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Navbar1;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

  const menu_list = (
    <Menu>
      <Menu.Item>
        <a href="#choose">Our Offers</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#team">Our Team</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#contact">Contact Us</a>
      </Menu.Item>
    </Menu>
  );

class Navbar extends Component {

    constructor(){
        super();
        this.goPanel = this.goPanel.bind(this);
    }

    goPanel(){
        if (localStorage.getItem('admin') == 2){
            window.location.href = '/admin';
        } else if (localStorage.getItem('admin') == 1){
            window.location.href = '/operator';
        } else {
            window.location.href = '/dentist';  
        }
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
        localStorage.setItem("admin",500)
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a className="nav-link" onClick={this.goPanel.bind(this)}>  
                            Panel
                </a>

                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                            Logout
                </a>          
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
             
                <Dropdown overlay={menu_list}>
                  <Link className="nav-link" to="#"><Icon  style={{ fontSize: '32px'}} type="align-left" theme="outlined" /></Link>
                </Dropdown>
                <Link className="navbar-brand" to="/">
                  <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" alt="Smiley face" width="120" height="50" ></img>
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
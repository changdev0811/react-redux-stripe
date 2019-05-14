import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import Error from '../Error';
import AdminManage from './AdminManage';


class Admin extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
       
        return (
            <div>
                {isAuthenticated && localStorage.getItem('admin') == 2 ? <AdminManage/> : <Error/>}
            </div>
        );
    }
}

Admin.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Admin));
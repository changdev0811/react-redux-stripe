import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import DentistManage from './DentistManage';
import Error from '../Error'

class Dentist extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                {isAuthenticated  && localStorage.getItem('admin') == 0 ? <DentistManage/> : <Error/>}
            </div>
        );
    }
}

Dentist.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Dentist));
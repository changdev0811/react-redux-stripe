import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import OpearatorManage from './OperatorManage';
import Error from '../Error'

class Operator extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {isAuthenticated  && localStorage.getItem('admin') == 1 ? <OpearatorManage/> : <Error/>}
            </div>
        );
    }
}

Operator.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Operator));
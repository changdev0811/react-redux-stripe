import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import Navbar from './Navbar';
import { Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastname: '',
            address: '',
            adli_number: '',
            phone: '',
            email: '',
            password: '',
            password_confirm: '',
            admin: '',
            card_number:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {

        if (this.state.password !== this.state.password_confirm) {
            message.error('Not matched password !')
            return false;
        }

        if (!this.state.card_number) {
            message.error('You must confirm card number')
            return false;
        }

        e.preventDefault();
        const user = {
            name: this.state.name,

            lastname: this.state.lastname,
            address: this.state.address,
            phone: this.state.phone,
            adli_number: this.state.adli_number,
            email: this.state.email,
            password: this.state.password,
            card_number: this.state.card_number,
            subscription: {
                offer1: 1,
                offer2: 0,
                offer3: 0,
                offer4: 0,
                offer5: 0,
                offer6: 0,
            },
            admin: 0,
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Navbar />
                <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                    <h2 style={{ marginBottom: '40px' }}>Registration</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.lastname
                            })}
                            name="lastname"
                            onChange={this.handleInputChange}
                            value={this.state.lastname}
                        />
                        {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phone
                            })}
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                        {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Adli Number"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.adli_number
                            })}
                            name="adli_number"
                            onChange={this.handleInputChange}
                            value={this.state.adli_number}
                        />
                        {errors.adli_number && (<div className="invalid-feedback">{errors.adli_number}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Address"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.address
                            })}
                            name="address"
                            onChange={this.handleInputChange}
                            value={this.state.address}
                        />
                        {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Stripe Card"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.card_number
                            })}
                            name="card_number"
                            onChange={this.handleInputChange}
                            value={this.state.card_number}
                        />
                    </div>

                    <div className="form-group">

                        <Row gutter={12}>
                            <Col span={12}>
                                <Link to="/login">
                                    <button className="btn btn-danger" style={{ width: '100%', backgroundColor: '#ce2828' }}>
                                        <strong style={{ fontSize: 20 }}>CANCEL</strong>
                                    </button>
                                </Link>
                            </Col>

                            <Col span={12}>
                                <button onClick={this.handleSubmit} className="btn btn-success" style={{ width: '100%', backgroundColor: '#00d563' }}>
                                    <strong style={{ fontSize: 20 }}>REGISTER</strong>
                                </button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
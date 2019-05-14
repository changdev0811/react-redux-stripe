import React, { Component } from 'react';
import Navbar from './Navbar';
import Welcome from './welcome'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Welcome/>
            </div>
        );
    }
}
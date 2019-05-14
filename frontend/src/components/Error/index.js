import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
    render() {
       
        return (
            <div>
                <Link to="/">Go home</Link>
            </div>
        );
    }
}


export default Error;
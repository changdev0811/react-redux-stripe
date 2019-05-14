import React from 'react';
import {Divider} from 'antd'
import './index.css'

export class Autionview extends React.Component {
  render() {
    return(
      <div className="container">
            <div className="aution-view">

            <h1>
                <strong>{this.props.title}</strong>
            </h1>

            <center><Divider style={{height:5,backgroundColor:'#00d563',width:'9%'}}/></center>
            <span>{this.props.description}</span>
        </div>
      </div>
    );
  }
}

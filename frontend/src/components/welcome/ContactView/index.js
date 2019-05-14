import React from 'react';
import { Button,Input } from 'antd';
import './index.css';

const { TextArea } = Input;

export class ContactView extends React.Component {
  render() {
    return(
      <div className="container-fluid">
       <div className="contact-view">

        <h1 className="text-white">
            <strong>CONTACT US!</strong>
        </h1>


        <h4 style={{float:'left',marginTop:50}} className="text-white">E-mail address</h4>
        <Input placeholder='E-mail address'></Input>

        <h4 style={{float:'left',marginTop:50}} className="text-white">How we can help you?</h4>
        <TextArea rows={4} />
        <Button style={{marginTop:70,borderRadius:20}}>SEND MESSAGE</Button>

      </div>
      </div>
    );
  }
}

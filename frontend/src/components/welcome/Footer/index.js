import React from 'react';
import {Row,Col,Icon} from 'antd'
import './index.css';

export class Footer extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <Row className="footer-view" >
            
            <Col md={8} xs={24}>
                <div className="mb-5">
                <h1 className="text-black">
                    <strong>
                      <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" alt="Smiley face" width="120" height="50" ></img>
                    </strong>
                </h1>
                <br/>
                <div style={{paddingRight:30}}>
                    <p>Quite a few companies decided to create watches on their own to compete with the tech giants in the smart watch industry versions&smart watches.</p>
                </div>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>product</strong>
                </h3>
                <br/>
                <p>Popular</p>
                <p>Trending</p>
                <p>Catalog</p>
                <p>Features</p>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>company</strong>
                </h3>
                <br/>
                <p>Pross Rokosos</p>
                <p>Misskon</p>
                <p>Strategy</p>
                <p>Works</p>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>Info</strong>
                </h3>
                <br/>
                <p>Support</p>
                <p>Developers</p>
                <p>Service</p>
                <p>Ger Started</p>
                </div>
            </Col>


            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>Follow us</strong>
                </h3>
                <br/>
                <Icon type="twitter" theme="outlined" style={{color:'#323232',fontSize:35,marginLeft:15}}/>
                <Icon type="google" theme="outlined" style={{color:'#323232',fontSize:35,marginLeft:15}}/>
                <Icon type="instagram" theme="outlined" style={{color:'#323232',fontSize:35,marginLeft:15}}/>
                <Icon type="facebook" theme="outlined" style={{color:'#323232',fontSize:35,marginLeft:15}}/>
                </div>
            </Col>
            </Row>
      </div>
    );
  }
}

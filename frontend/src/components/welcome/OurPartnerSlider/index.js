import React from 'react';
import { Row, Col } from 'antd';

export class OurPartnerSlider extends React.Component {
  render() {
    return(
      <div className="container-fluid">

        <Row gutter={48} style={{padding:0,marginLeft:'10%',marginRight:'10%',marginTop:40}}>

            <Col span={4} xs={24} md={4}>
            <center><img alt="example" src="http://support.jnf.org/images/content/pagebuilder/Tu-BiShvat.jpg" width="200" style={{marginTop:20}}/></center>
            </Col>

            <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://i.pinimg.com/originals/a6/3f/7e/a63f7e9d12d2daae5b621bd230924330.jpg" width="200" style={{marginTop:20}}/></center>
            </Col>

            <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://www.handinhandk12.org/sites/handinhand/files/handinhand_logo.png" style={{marginTop:20}} width="200"/></center>
            </Col>

            <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="http://www.dsip.co.il/images/logo.png" style={{marginTop:20}} width="200"/></center>
            </Col>

            <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://nftyisrael.org/wp-content/uploads/sites/40/2015/11/nfty-israel-logo.jpg" style={{marginTop:20}} width="200"/></center>
            </Col>

            <Col span={4} md={4}  xs={24}>
            <center><img alt="example" src="http://www.ipr.gov.ba/img/w/825/upload/images/logo_tm_view.jpg" style={{marginTop:20}} width="200"/></center>
            </Col>

        </Row>


      </div>
    );
  }
}

import React from 'react';
import {Row,Col} from 'antd';

export class Videoview extends React.Component {
  render() {
    return(
      <div className="container-fluid">
         <Row gutter={48} style={{padding:0,margin:0,marginTop:40}}>

                <Col span={12} style={{height:570}}>
                    <iframe style={{width:'100%',height:'100%'}}
                            src="https://www.youtube.com/embed/zYpb_4rcWl4" 
                            >
                    </iframe>
                    {/* <div style={{width:'100%', height:'100%', backgroundColor:'#5cb4fb', borderRadius: 20}}></div> */}
                </Col>

                <Col span={12} >
                <div style={{marginTop:'20%',padding:'6%'}}>
                    <span style={{fontSize:40}}>We help build trust with design</span>
                    <br/>
                    <span style={{fontSize:14}}>We are passionate about creating adaptive designs that will improve your digital presence and will increase the retention rate and trust of your website visitors.</span>
                </div>
                </Col>
          </Row>

      </div>
    );
  }
}

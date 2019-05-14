import React from 'react';
import { Card } from 'antd';
import Slider from "react-slick";
import './index.css';

export class TeamMemberSlider extends React.Component {
  render() {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "15px",
        slidesToShow: 5,
        speed: 500
      };

    return(
      <div className="container-fluid slider">

       <Slider {...settings} gutter={70}>
          
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="http://webcom.colostate.edu/china/files/2016/05/Tang-Wenyuan-profile-photo.jpg" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="https://d1o51r9qdgnnlz.cloudfront.net/profile/profile_mike-030d0469-9e74-48da-914f-71d17aaedca7.png" />}
            >
             <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="https://www.washingtonpost.com/resizer/veyZTpsvZ05rhrkBm01wkhxKgj4=/200x200/s3.amazonaws.com/arc-authors/washpost/8de6ff68-199a-4a59-a7b7-2ba00d3daab1.png" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="http://webcom.colostate.edu/china/files/2016/05/Yu-Xiuyuan-Profile-photo.jpg" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="http://www.xjtlu.edu.cn/en/assets/image-cache/158822536xec.c7c0fced.jpg" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>

          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

              cover={<img alt="example" src="https://s3-us-west-1.amazonaws.com/co-directory-images/jack-mckenna-30466432.jpg" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>

          
          <Card
              hoverable
              bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}
                cover={<img alt="example" src="http://wwwf.imperial.ac.uk/blog/student-blogs/files/2017/01/xu-profile-400-1-150x150.png" />}
            >
              <div style={{textAlign:'center'}}>
                <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                <br/>
                <span>Co- Jar man</span>
              </div>
          </Card>

      </Slider>

      </div>
    );
  }
}

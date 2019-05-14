
import React from 'react';
import { Carousel } from 'antd'
import './index.css'

export class MainCarousel extends React.Component {
  render() {
    return(
      <div className="container-fluid" style={{margin:0,padding:0}}>
       
       <Carousel autoplay>
          <div className="ProfileHeadCard" >
              <div className="hero-image1 heoo-text">
                <p className="carousel-text">Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed</p>
              </div>
          </div>
          
          <div className="ProfileHeadCard" >
              <div className=" hero-image2 heoo-text">
                <p className="carousel-text">Hello How are you? adipiscing elit, sed</p>
              </div>
          </div>

          <div className="ProfileHeadCard">
              <div className=" hero-image3 heoo-text">
                <p className="carousel-text">Very Well Thanks ,consectetur adipiscing elit, sed</p>
              </div>
          </div>
        </Carousel>


      </div>
    );
  }
}

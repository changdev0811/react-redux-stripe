import React from "react";
import { MainCarousel } from "./maincarousel";
import { Videoview } from "./videoview";
import { Autionview } from "./autionview";
import { Pricingitem } from "./pricingitem";
import { TeamMemberSlider } from "./TeamMemberSlider";
import { ContactView } from "./ContactView";
import { Footer } from "./Footer";
import { BackTop } from "antd";

import { Row, Col } from "antd";
import "./index.css";
import { OurPartnerSlider } from "./OurPartnerSlider";

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="home">
        <BackTop>
          <div className="ant-back-top-inner">Top</div>
        </BackTop>
        <MainCarousel />
        <Videoview />

        <div id="choose">
          <Autionview
            title="Choose your package"
            description="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth"
          />
          <div className="price-view container">
            <Row>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 1"
                    price="24"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 2"
                    price="39"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 3"
                    price="45"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
            </Row>

            <Row>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 4"
                    price="24"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 5"
                    price="39"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
              <Col xs={24} md={8}>
                <center>
                  <Pricingitem
                    title="Offer 6"
                    price="45"
                    products="Unlimited products"
                    downloads="Unlimited downloads"
                    capacity="1000 GB"
                  />
                </center>
              </Col>
            </Row>
          </div>
        </div>

        <div id="team">
          <Autionview
            title="Our Team"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
          />
        </div>
        <OurPartnerSlider />
        <TeamMemberSlider />
        <ContactView />

        <div id="contact">
          <Footer />
        </div>
      </div>
    );
  }
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Input,
  Divider,
  Collapse,
  Checkbox,
  message,
  Table
} from "antd";
import {
  logoutUser,
  UpdateDentist,
  UpdateDentistSubscription
} from "../../../actions/authentication";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Managefile from "./Pdfupload";
import axios from "axios";
import Checkout from "../../Stripe/Checkout";
import "./index.css";
const Panel = Collapse.Panel;
const useradmin = JSON.parse(localStorage.getItem("UserAdmin"));
const pwa = JSON.parse(localStorage.getItem("pwa"));

class DentistManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer1: false,
      offer2: false,
      offer3: false,
      offer4: false,
      offer5: false,
      offer6: false,
      offer_pay: 390,
      name: "",
      lastname: "",
      email: "",
      address: "",
      adli_number: "",
      password: pwa,
      phone: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.columns = [
      {
        title: "Offer Number",
        dataIndex: "Offernumber",
        key: "Offernumber"
      },
      {
        title: "Subscription Date",
        key: "subscription_date",
        dataIndex: "subscription_date",
        onFilter: (value, record) =>
          record.subscription_date.indexOf(value) === 0,
        sorter: (a, b) => {
          return a.subscription_date.localeCompare(b.subscription_date);
        },
        render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
      },
      {
        title: "Renew Date",
        key: "renew_date",
        dataIndex: "renew_date",
        onFilter: (value, record) => record.renew_date.indexOf(value) === 0,
        sorter: (a, b) => {
          return a.renew_date.localeCompare(b.renew_date);
        },
        render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              style={{ backgroundColor: "#00a99d", color: "#fff" }}
              onClick={() => this.handleView(record)}
            >
              Cancel
            </Button>
          </span>
        )
      }
    ];

    this.columnsbillings = [
      {
        title: "Billing",
        dataIndex: "Offernumber",
        key: "Offernumber"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              style={{ backgroundColor: "#00a99d", color: "#fff" }}
              onClick={() => this.handleView(record)}
            >
              Print
            </Button>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    axios.get("/api/members/" + useradmin).then(res => {
      this.setState({
        name: res.data.data.name,
        lastname: res.data.data.lastname,
        email: res.data.data.email,
        address: res.data.data.address,
        adli_number: res.data.data.adli_number,
        phone: res.data.data.phone,
        offer1: !!res.data.data.subscription.offer1,
        offer2: !!res.data.data.subscription.offer2,
        offer3: !!res.data.data.subscription.offer3,
        offer4: !!res.data.data.subscription.offer4,
        offer5: !!res.data.data.subscription.offer5,
        offer6: !!res.data.data.subscription.offer6
      });
    });
  }

  state = {
    profile: false,
    subscription: false,
    manage: false
  };

  showProfile = () => {
    this.setState({
      profile: true
    });
  };

  showSubscription = () => {
    localStorage.setItem("payment", 0);
    this.setState({
      subscription: true
    });
  };

  showManage = () => {
    this.setState({
      manage: true
    });
  };

  handleOk = e => {
    this.setState({
      profile: false,
      subscription: false,
      manage: false
    });
  };

  handleCancel = e => {
    this.setState({
      profile: false,
      subscription: false,
      manage: false
    });
  };

  handleChange1() {
    if (this.state.offer6) {
      return false;
    }

    this.setState({
      offer1: !this.state.offer1,
      offer_pay: 390
    });
  }

  handleChange2() {
    this.setState({
      offer2: !this.state.offer2,
      offer_pay: 3900
    });
  }

  handleChange3() {
    this.setState({
      offer3: !this.state.offer3,
      offer_pay: 750
    });
    !this.state.offer3
      ? this.setState({ offer_pay: 750 })
      : this.setState({ offer_pay: 390 });
  }

  handleChange4() {
    this.setState({
      offer4: !this.state.offer4,
      offer_pay: 7500
    });
    !this.state.offer4
      ? this.setState({ offer_pay: 7500 })
      : this.setState({ offer_pay: 390 });
  }

  handleChange5() {
    this.setState({
      offer5: !this.state.offer5,
      offer_pay: 990
    });
    !this.state.offer5
      ? this.setState({ offer_pay: 990 })
      : this.setState({ offer_pay: 390 });
  }

  handleChange6() {
    this.setState({
      offer6: !this.state.offer6
    });
    !this.state.offer6
      ? this.setState({ offer_pay: 9900 })
      : this.setState({ offer_pay: 390 });
  }

  handleSubmit() {
    if (localStorage.getItem("payment") == 0) {
      message.error("You must pay with card directly!");
      return false;
    }

    const dentist = {
      subscription: {
        offer1: +this.state.offer1,
        offer2: +this.state.offer2,
        offer3: +this.state.offer3,
        offer4: +this.state.offer4,
        offer5: +this.state.offer5,
        offer6: +this.state.offer6
      }
    };

    this.props.UpdateDentistSubscription(dentist, this.props.history);
    this.setState({
      offer1: this.state.offer1,
      offer2: this.state.offer2,
      offer3: this.state.offer3,
      offer4: this.state.offer4,
      offer5: this.state.offer5,
      offer6: this.state.offer6,
      subscription: !this.state.subscription
    });
  }

  handleUpdate() {
    if (!this.state.name) {
      message.error("Your name is empty!");
      return false;
    }

    if (!this.state.password) {
      message.error("Your password is empty!");
      return false;
    }

    if (!this.state.email) {
      message.error("Your email is empty!");
      return false;
    }
    const dentist = {
      name: this.state.name,
      lastname: this.state.lastname,
      address: this.state.address,
      phone: this.state.phone,
      adli_number: this.state.adli_number,
      email: this.state.email,
      password: this.state.password
    };
    this.props.UpdateDentist(dentist, this.props.history);
    this.setState({
      profile: false
    });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin", 500);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: "#e7ebee", height: "100vh" }}
      >
        <Row>
          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "fixed", height: "100vh" }}
          >
            <div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <img
                  src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png"
                  alt="Smiley face"
                  height="50"
                  width="120"
                />
                <br />
                <br />
                <Avatar
                  src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                  style={{ width: 110, height: 110 }}
                />
                <br />
                <br />
                <br />
                <span className="text-muted" style={{ color: "#fff" }}>
                  {this.state.name}
                </span>
                <br />
                <strong style={{ color: "#fff" }}>{this.state.email}</strong>
              </div>
              <a
                style={{
                  position: "absolute",
                  bottom: 20,
                  color: "#fff",
                  left: "40%",
                  cursor: "point"
                }}
                onClick={this.onLogout.bind(this)}
              >
                sign out
              </a>
            </div>
          </Col>

          <Col
            xs={10}
            md={4}
            className="sidebar"
            style={{ position: "relative" }}
          />

          <Col xs={14} md={20}>
            <Link to="/">
              <Button
                style={{
                  marginLeft: 100,
                  marginTop: 40,
                  backgroundColor: "#00a99d",
                  color: "#fff",
                  width: 120,
                  height: 50
                }}
              >
                Back
              </Button>
            </Link>
            <div className="card-view">
              <p>Dentist</p>
              <Card style={{ backgroundColor: "#f5f6f8" }}>Item Options</Card>
              <Card>
                View Profile Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showProfile}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Subscription Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showSubscription}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Manage File Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  onClick={this.showManage}
                >
                  Click Here
                </Button>
              </Card>
              <Card>
                View Archive File Section
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00a99d",
                    color: "#fff"
                  }}
                  // onClick={this.showManage}
                >
                  Click Here
                </Button>
              </Card>
              <br />
              You can currently upload X documents based on your active
              subscriptions.
            </div>
          </Col>
        </Row>

        <Modal
          centered={true}
          title={"Personal Information"}
          visible={this.state.profile}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>First Name</label>
                <Input
                  style={{ border: "none" }}
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Last Name</label>
                <Input
                  style={{ border: "none" }}
                  name="lastname"
                  onChange={this.handleInputChange}
                  value={this.state.lastname}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={24}>
                <label style={{ fontWeight: "800" }}>Password</label>
                <Input
                  type="text"
                  style={{ border: "none" }}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Phone</label>
                <Input
                  style={{ border: "none" }}
                  name="phone"
                  onChange={this.handleInputChange}
                  value={this.state.phone}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  style={{ border: "none" }}
                  type="email"
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Address</label>
                <Input
                  style={{ border: "none" }}
                  name="address"
                  onChange={this.handleInputChange}
                  value={this.state.address}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Adzli Number</label>
                <Input
                  style={{ border: "none" }}
                  name="adli_number"
                  onChange={this.handleInputChange}
                  value={this.state.adli_number}
                />
              </Col>

              <button
                className="btn btn-info"
                onClick={this.handleUpdate}
                style={{
                  width: "100%",
                  backgroundColor: "#0089dc",
                  marginTop: 20
                }}
              >
                <strong style={{ fontSize: 20 }}>Update</strong>
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          title={"Personal Information"}
          visible={this.state.subscription}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Collapse bordered={false}>
            <Panel header="Choose an offer" key="1">
              <span style={{ marginLeft: 20 }}>Offer 1</span>
              <Checkbox
                name="offer1"
                onChange={this.handleChange1.bind(this)}
                value={this.state.offer1}
                style={{ color: "#666", float: "right" }}
                checked={this.state.offer1}
              />
              <br />
              <span style={{ marginLeft: 20 }}>Offer 2</span>
              <Checkbox
                name="offer2"
                onChange={this.handleChange2.bind(this)}
                value={this.state.offer2}
                style={{ clear: "both", color: "#666", float: "right" }}
                checked={this.state.offer2}
              />
              <br />
              <span style={{ marginLeft: 20 }}>Offer 3</span>
              <Checkbox
                name="offer3"
                onChange={this.handleChange3.bind(this)}
                value={this.state.offer3}
                style={{ clear: "both", color: "#666", float: "right" }}
                checked={this.state.offer3}
              />
              <br />
              <span style={{ marginLeft: 20 }}>Offer 4</span>
              <Checkbox
                name="offer4"
                onChange={this.handleChange4.bind(this)}
                value={this.state.offer4}
                style={{ clear: "both", color: "#666", float: "right" }}
                checked={this.state.offer4}
              />
              <br />
              <span style={{ marginLeft: 20 }}>Offer 5</span>
              <Checkbox
                name="offer5"
                onChange={this.handleChange5.bind(this)}
                value={this.state.offer5}
                style={{ clear: "both", color: "#666", float: "right" }}
                checked={this.state.offer5}
              />
              <br />
              <span style={{ marginLeft: 20 }}>Offer 6</span>
              <Checkbox
                name="offer6"
                onChange={this.handleChange6.bind(this)}
                value={this.state.offer6}
                style={{ clear: "both", color: "#666", float: "right" }}
                checked={this.state.offer6}
              />
              <br />
              <br />

              <center>
                <Checkout
                  name={"Payment Subscription"}
                  description={"You are about to pay for your subscription"}
                  amount={this.state.offer_pay}
                />
              </center>

              {this.state.offer_pay}

              <button
                style={{ width: "100%", marginTop: 30 }}
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                Update
              </button>

              <br />
            </Panel>
          </Collapse>

          {/* Subscription Area */}
          <Collapse bordered={false}>
            <Panel header="Subscription Area" key="2">
              <div className="card-view">
                <Card style={{ width: "118%", marginLeft: "-42px" }}>
                  <Table columns={this.columns} />
                  {/* dataSource={this.state.data_document}  */}
                </Card>
              </div>
              <br />
            </Panel>
          </Collapse>

          {/* Billing Area */}
          <Collapse bordered={false}>
            <Panel header="Billing Area" key="2">
              <div className="card-view">
                <Card style={{ width: "118%", marginLeft: "-42px" }}>
                  <Table columns={this.columnsbillings} />
                  {/* dataSource={this.state.data_document}  */}
                </Card>
              </div>
              <br />
            </Panel>
          </Collapse>
        </Modal>

        <Modal
          centered={true}
          title={"Upload Pdf"}
          visible={this.state.manage}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={820}
          footer={[]}
        >
          <Managefile username={this.state.name} />
        </Modal>
      </div>
    );
  }
}

DentistManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  UpdateDentist: PropTypes.func.isRequired,
  UpdateDentistSubscription: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, UpdateDentist, UpdateDentistSubscription }
)(withRouter(DentistManage));

import React from "react";
import {
  Avatar,
  Button,
  Row,
  Col,
  Card,
  List,
  Collapse,
  Icon,
  Input,
  Divider,
  Modal,
  Checkbox,
  Table,
  message,
  Progress
} from "antd";
import { customPanelStyle } from "./const";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  addDentist,
  UpdateDentistByAdmin,
  UpdateDentistSubscriptionByadmin,
  UpdateOpertorByAdmin
} from "../../../actions/authentication";
import axios from "axios";
import { CSVLink } from "react-csv";
import update from "react-addons-update";

const Panel = Collapse.Panel;

const columns_history = [
  {
    title: "Name",
    dataIndex: "operator_name",
    key: "operator_name"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    title: "Active Statusbar",
    key: "status1",
    dataIndex: "status",
    render: text =>
      text === "Successful" ? (
        <Progress percent={100} />
      ) : text === "Un Successful" ? (
        <Progress percent={50} status="exception" showInfo={false} />
      ) : (
        <Progress percent={50} showInfo={false} />
      )
  },
  {
    title: "Remark",
    dataIndex: "remark",
    key: "remark"
  },
  {
    title: "Date",
    key: "created_date",
    dataIndex: "created_date",
    onFilter: (value, record) => record.created_date.indexOf(value) === 0,
    sorter: (a, b) => {
      return a.created_date.localeCompare(b.created_date);
    },
    render: text => <span>{text.replace("T", " ").substring(0, 19)}</span>
  },
  {
    title: "Dentist",
    key: "dentist_name",
    dataIndex: "dentist_name",
    onFilter: (value, record) => record.dentist_name.indexOf(value) === 0,
    sorter: (a, b) => a.dentist_name.length + b.dentist_name.length
  }
];
function callback(key) {}

class AdminStuff extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      Oname: "",
      lastname: "",
      address: "",
      number: "",
      phone: "",
      email: "",
      Oemail: "",
      password: "",
      Opassword: "",
      update_name_d: "",
      update_email_d: "",
      update_password_d: "",
      update_address_d: "",
      update_lastname_d: "",
      update_phone_d: "",

      update_name_0: "",
      update_email_0: "",
      update_password_0: "",

      users_list: [],
      data_dentists: [],
      data_operators: [],
      data_histories: [],
      selectKey: -1,
      errors: {},

      offer1: false,
      offer2: false,
      offer3: false,
      offer4: false,
      offer5: false,
      offer6: false,

      Oname_byadmin: "",
      Opassword_byadmin: "",
      Oemail_byadmin: "",
      download_csv: false,

      csv_data: [
        { firstname: "1111", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "2222", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "3333", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ],
      dummy: [
        { firstname: "1111", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "2222", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "3333", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitO = this.handleSubmitO.bind(this);
    this.DeleteDentist = this.DeleteDentist.bind(this);
    this.DeleteOperator = this.DeleteOperator.bind(this);
    this.UpdateDentist = this.UpdateDentist.bind(this);
    this.UpdateOperator = this.UpdateOperator.bind(this);
    this.handleUpdateDentist = this.handleUpdateDentist.bind(this);
    this.handleUpdateOperator = this.handleUpdateOperator.bind(this);
    this.handleUpdateSubscription = this.handleUpdateSubscription.bind(this);
    this.UpdateSubscription = this.UpdateSubscription.bind(this);
    this.handleSubmitO_Byadmin = this.handleSubmitO_Byadmin.bind(this);
    this.HandleHistories = this.HandleHistories.bind(this);
  }

  state = {
    visible: false,
    visible_opertor: false,
    Update_dentist_visible: false,
    Update_operator_visible: false,
    update_subscription_byadmin_visible: false,
    visible_opertor_byadmin: false,
    visible_history: false
  };

  handleChange1() {
    this.setState({
      offer1: !this.state.offer1
    });
  }

  handleChange2() {
    this.setState({
      offer2: !this.state.offer2,
      check1: 1
    });
  }

  handleChange3() {
    this.setState({
      offer3: !this.state.offer3
    });
  }

  handleChange4() {
    this.setState({
      offer4: !this.state.offer4
    });
  }

  handleChange5() {
    this.setState({
      offer5: !this.state.offer5
    });
  }

  handleChange6() {
    this.setState({
      offer6: !this.state.offer6
    });
  }

  DownloadCSV() {
    this.setState({
      visible_history: false,
      download_csv: true,
      csv_data: this.state.data_histories
    });
  }

  componentDidMount() {
    axios.get("/api/members/dentist").then(res => {
      const data_dentists = res.data;
      this.setState({ data_dentists });
    });

    axios.get("/api/members/operator").then(res => {
      const data_operators = res.data;
      this.setState({ data_operators });
    });
  }

  UpdateOperator(e, wholedata) {
    const index = wholedata.findIndex(item => item._id === e._id);
    localStorage.setItem("update_dentist", e._id);

    this.setState({
      Oname_byadmin: wholedata[index].name,
      Oemail_byadmin: wholedata[index].email
    });

    this.setState({
      visible_opertor_byadmin: true
    });
  }

  handleSubmitO_Byadmin() {
    if (!this.state.Oname_byadmin) {
      message.error("Operator name is empty");
      return false;
    }

    if (!this.state.Oemail_byadmin) {
      message.error("Operator email is empty");
      return false;
    }

    if (!this.state.Oemail_byadmin.includes("@")) {
      message.error("Operator email is invalid");
      return false;
    }

    const mydata = {
      name: this.state.Oname_byadmin,
      email: this.state.Oemail_byadmin,
      password: this.state.Opassword_byadmin
    };

    this.setState({
      visible_opertor_byadmin: false
    });
    this.props.UpdateOpertorByAdmin(mydata, this.props.history);
  }

  HandleHistories(e, wholedata) {
    let that = this;
    this.setState({
      visible_history: true
    });
    axios.get("/api/histories/" + e._id).then(res => {
      that.setState({ data_histories: res.data, csv_data: res.data });
    });
  }

  handleInputChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  showModalOperator = () => {
    this.setState({
      visible_opertor: true
    });
  };

  showModalDentist = () => {
    this.setState({
      visible: true
    });
  };

  handlePayment = e => {
    this.setState({
      hidden: !this.state.hidden
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
      visible_opertor: false,
      Update_dentist_visible: false,
      Update_operator_visible: false,
      update_operator_byadmin_visible: false,
      update_subscription_byadmin_visible: false,
      visible_opertor_byadmin: false,
      visible_history: false,
      download_csv: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      visible_opertor: false,
      Update_dentist_visible: false,
      Update_operator_visible: false,
      update_operator_byadmin_visible: false,
      update_subscription_byadmin_visible: false,
      visible_opertor_byadmin: false,
      visible_history: false,
      download_csv: false
    });
  };

  handleSubmit() {
    if (!this.state.name) {
      message.error("Dentist name is empty");
      return false;
    }

    if (!this.state.email) {
      message.error("Dentist email is empty");
      return false;
    }

    if (!this.state.email.includes("@")) {
      message.error("Dentist email is invalid");
      return false;
    }

    if (!this.state.password) {
      message.error("Dentist password is empty");
      return false;
    }

    let that = this;
    const InserData = {
      name: this.state.name,
      lastname: this.state.lastname,
      address: this.state.address,
      phone: this.state.phone,
      number: this.state.number,
      email: this.state.email,
      password: this.state.password,
      admin: 0,
      subscription: {
        offer1: 1,
        offer2: 0,
        offer3: 0,
        offer4: 0,
        offer5: 0,
        offer6: 0
      }
    };

    axios({
      method: "post",
      url: `/api/members/register`,
      data: InserData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        if (response.status === 200) {
        }

        that.setState(
          {
            data_dentists: [...that.state.data_dentists, InserData],
            visible: false
          },
          () => {}
        );
      })

      .catch(function(response) {
        return;
      });
  }

  DeleteDentist(e, wholedata) {
    let that = this;
    const index = wholedata.findIndex(item => item._id === e._id);

    axios({
      method: "delete",
      url: `/api/members/` + e._id
    })
      .then(function(response) {
        if (response.status === 200) {
        }
      })

      .catch(function(response) {
        return;
      });

    var array = [...that.state.data_dentists];
    array.splice(index, 1);
    that.setState({ data_dentists: array });
  }

  UpdateDentist(e, wholedata) {
    localStorage.setItem("update_dentist", e._id);
    this.setState({
      Update_dentist_visible: true
    });
    const index = wholedata.findIndex(item => item._id === e._id);

    this.setState({
      update_name_d: wholedata[index].name,
      update_lastname_d: wholedata[index].lastname,
      update_email_d: wholedata[index].email,
      update_address_d: wholedata[index].address,
      update_phone_d: wholedata[index].phone
    });
  }

  UpdateSubscription(e, wholedata) {
    this.setState({
      update_subscription_byadmin_visible: true
    });

    localStorage.setItem("update_dentist", e._id);
    const index = wholedata.findIndex(item => item._id === e._id);

    this.setState({
      offer1: wholedata[index].subscription.offer1,
      offer2: wholedata[index].subscription.offer2,
      offer3: wholedata[index].subscription.offer3,
      offer4: wholedata[index].subscription.offer4,
      offer5: wholedata[index].subscription.offer5,
      offer6: wholedata[index].subscription.offer6
    });
  }

  handleUpdateDentist() {
    if (!this.state.update_name_d) {
      message.error("Dentist name is empty");
      return false;
    }

    if (!this.state.update_email_d) {
      message.error("Dentist email is empty");
      return false;
    }

    if (!this.state.update_email_d.includes("@")) {
      message.error("Dentist email is invalid");
      return false;
    }
    const dentist = {
      name: this.state.update_name_d,
      lastname: this.state.update_lastname_d,
      address: this.state.update_address_d,
      phone: this.state.update_phone_d,
      adli_number: this.state.update_number_d,
      email: this.state.update_email_d,
      password: this.state.update_password_d
    };
    this.props.UpdateDentistByAdmin(dentist, this.props.history);
    this.setState({
      Update_dentist_visible: false
    });
  }

  handleUpdateOperator() {
    const dentist = {
      name: this.state.update_name_d,
      lastname: this.state.update_lastname_d,
      address: this.state.update_address_d,
      phone: this.state.update_phone_d,
      // adli_number: this.state.update_number_d,
      email: this.state.update_email_d,
      password: this.state.update_password_d
    };
    this.props.UpdateDentistByAdmin(dentist, this.props.history);
    this.setState({
      Update_dentist_visible: false
    });
  }

  handleUpdateSubscription() {
    const mydata = {
      subscription: {
        offer1: +this.state.offer1,
        offer2: +this.state.offer2,
        offer3: +this.state.offer3,
        offer4: +this.state.offer4,
        offer5: +this.state.offer5,
        offer6: +this.state.offer6
      }
    };

    this.props.UpdateDentistSubscriptionByadmin(mydata, this.props.history);
    this.setState({
      update_subscription_byadmin_visible: false
    });
  }

  DeleteOperator(e, wholedata) {
    let that = this;
    const index = wholedata.findIndex(item => item._id === e._id);

    axios({
      method: "delete",
      url: `/api/members/` + e._id
    })
      .then(function(response) {})

      .catch(function(response) {
        return;
      });
    var array = [...that.state.data_operators];
    array.splice(index, 1);
    that.setState({ data_operators: array });
    window.location.href = "/admin";
  }

  handleSubmitO() {
    if (!this.state.Oname) {
      message.error("Operator name is empty");
      return false;
    }

    if (!this.state.Oemail) {
      message.error("Operator email is empty");
      return false;
    }

    if (!this.state.Oemail.includes("@")) {
      message.error("Operator email is invalid");
      return false;
    }

    if (!this.state.Opassword) {
      message.error("Operator password is empty");
      return false;
    }

    let that = this;
    const InserDataO = {
      name: this.state.Oname,
      email: this.state.Oemail,
      password: this.state.Opassword,
      admin: 1,
      subscription: {
        offer1: 0
      }
    };

    axios({
      method: "post",
      url: `/api/members/register`,
      data: InserDataO,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        that.setState(
          {
            data_operators: [...that.state.data_operators, InserDataO],
            visible_opertor: false
          },
          () => {}
        );
        window.location.href = "/admin";
        message.success("New operator inserted!");
      })

      .catch(function(response) {
        return;
      });
  }

  render() {
    return (
      <div>
        <Row gutter={12}>
          <Col xs={12}>
            <Card>
              Your Operators
              <List
                itemLayout="horizontal"
                dataSource={this.state.data_operators}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Collapse bordered={false} onChange={callback}>
                          <Panel
                            header={
                              <div>
                                <Avatar
                                  src={
                                    "https://www.logolynx.com/images/logolynx/80/806ea60a1cae8046972d737107c2c8df.png"
                                  }
                                  size="large"
                                />
                                <span style={{ marginLeft: 15 }}>
                                  {item.name}
                                </span>
                              </div>
                            }
                            style={customPanelStyle}
                            key="1"
                          >
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Dental Work History
                            </span>
                            <Icon
                              type="file-pdf"
                              onClick={(e, data) =>
                                this.HandleHistories(
                                  item,
                                  this.state.data_histories
                                )
                              }
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                            <br />
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Edit Account
                            </span>
                            <Icon
                              type="form"
                              onClick={(e, data) =>
                                this.UpdateOperator(
                                  item,
                                  this.state.data_operators
                                )
                              }
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                            <br />
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Delete Account
                            </span>
                            <Icon
                              onClick={(e, data) =>
                                this.DeleteOperator(
                                  item,
                                  this.state.data_operators
                                )
                              }
                              type="delete"
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                          </Panel>
                        </Collapse>
                      }
                    />
                  </List.Item>
                )}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  shape={"circle"}
                  style={{
                    backgroundColor: "#00a99d",
                    color: "#fff",
                    fontSize: 30,
                    width: 50,
                    height: 50
                  }}
                  onClick={this.showModalOperator}
                >
                  +
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={12}>
            <Card>
              Your Dentists
              <List
                itemLayout="horizontal"
                dataSource={this.state.data_dentists}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Collapse bordered={false} onChange={callback}>
                          <Panel
                            header={
                              <div>
                                <Avatar
                                  src={
                                    "https://www.shareicon.net/data/2015/12/21/690827_office_512x512.png"
                                  }
                                  size="large"
                                />
                                <span style={{ marginLeft: 15 }}>
                                  {item.name}
                                </span>
                              </div>
                            }
                            style={customPanelStyle}
                            key={1}
                          >
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Manage Subscriptions{" "}
                            </span>
                            <Icon
                              type="file-pdf"
                              onClick={(e, data) =>
                                this.UpdateSubscription(
                                  item,
                                  this.state.data_dentists
                                )
                              }
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                            <br />
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Edit Account
                            </span>
                            <Icon
                              type="form"
                              onClick={(e, data) =>
                                this.UpdateDentist(
                                  item,
                                  this.state.data_dentists
                                )
                              }
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                            <br />
                            <span
                              style={{
                                marginLeft: 50,
                                fontSize: 25,
                                fontWeight: "400"
                              }}
                            >
                              Delete Account
                            </span>
                            <Icon
                              onClick={(e, data) =>
                                this.DeleteDentist(
                                  item,
                                  this.state.data_dentists
                                )
                              }
                              type="delete"
                              theme="outlined"
                              style={{
                                color: "#666",
                                float: "right",
                                fontSize: 25,
                                cursor: "pointer"
                              }}
                            />
                          </Panel>
                        </Collapse>
                      }
                    />
                  </List.Item>
                )}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  shape={"circle"}
                  style={{
                    backgroundColor: "#00a99d",
                    color: "#fff",
                    fontSize: 30,
                    width: 50,
                    height: 50
                  }}
                  onClick={this.showModalDentist}
                >
                  +
                </Button>
              </div>
            </Card>
          </Col>

          <CSVLink data={this.state.dummy}>
            <Button
              type="primary"
              style={{ float: "right", marginLeft: 20, marginTop: 20 }}
            >
              Main 2
            </Button>
          </CSVLink>

          <CSVLink data={this.state.dummy}>
            <Button type="primary" style={{ float: "right", marginTop: 20 }}>
              Main 1
            </Button>
          </CSVLink>
        </Row>

        <Modal
          centered={true}
          title={"Dentist Information"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>First Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Last Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={24}>
                <label style={{ fontWeight: "800" }}>Password</label>
                <Input
                  placeholder="********"
                  style={{ border: "none" }}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Phone</label>
                <Input
                  placeholder="+1 234 56789"
                  style={{ border: "none" }}
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  placeholder="jammy_white@aol.com"
                  style={{ border: "none" }}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={24}>
                <label style={{ fontWeight: "800" }}>Address</label>
                <Input
                  placeholder="10 Woodford St, California CA 9820"
                  style={{ border: "none" }}
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Adzli Number</label>
                <Input
                  placeholder="123456789"
                  style={{ border: "none" }}
                  value={this.state.number}
                  name="number"
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Input</label>
                <Input
                  placeholder="abc def ghki"
                  style={{ border: "none" }}
                  onChange={this.handleInputChange}
                />
              </Col>

              <button
                onClick={this.handleSubmit.bind(this)}
                style={{ width: "100%" }}
              >
                Register
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          title={"Dentist Information"}
          visible={this.state.Update_dentist_visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>First Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="update_name_d"
                  value={this.state.update_name_d}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Last Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="update_lastname_d"
                  value={this.state.update_lastname_d}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={24}>
                <label style={{ fontWeight: "800" }}>Password</label>
                <Input
                  placeholder="********"
                  style={{ border: "none" }}
                  name="update_password_d"
                  value={this.state.update_password_d}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Phone</label>
                <Input
                  placeholder="+1 234 56789"
                  style={{ border: "none" }}
                  name="update_phone_d"
                  value={this.state.update_phone_d}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  placeholder="jammy_white@aol.com"
                  style={{ border: "none" }}
                  name="update_email_d"
                  value={this.state.update_email_d}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Address</label>
                <Input
                  placeholder="10 Woodford St, California CA 9820"
                  style={{ border: "none" }}
                  name="update_address_d"
                  value={this.state.update_address_d}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Adeli Number</label>
                <Input
                  placeholder="123456789"
                  style={{ border: "none" }}
                  value={this.state.update_number_d}
                  name="update_number_d"
                  onChange={this.handleInputChange}
                />
              </Col>

              <button
                onClick={this.handleUpdateDentist.bind(this)}
                style={{ width: "100%" }}
              >
                Edit
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          title={"Operator Information"}
          visible={this.state.visible_opertor}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="Oname"
                  value={this.state.Oname}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Password</label>
                <Input
                  placeholder="********"
                  style={{ border: "none" }}
                  name="Opassword"
                  value={this.state.Opassword}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  placeholder="jammy_white@aol.com"
                  style={{ border: "none" }}
                  name="Oemail"
                  value={this.state.Oemail}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <button
                onClick={this.handleSubmitO.bind(this)}
                style={{ width: "100%" }}
              >
                Register
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          title={"Personal Information"}
          visible={this.state.update_subscription_byadmin_visible}
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

              <button
                style={{ width: "100%" }}
                onClick={this.handleUpdateSubscription}
                className="btn btn-primary"
              >
                Update Subscription
              </button>
              <br />
            </Panel>
          </Collapse>
        </Modal>

        <Modal
          centered={true}
          title={"Operator Information"}
          visible={this.state.visible_opertor_byadmin}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Row gutter={48} style={{ padding: 0, margin: 0 }}>
              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Name</label>
                <Input
                  placeholder="Jammy"
                  style={{ border: "none" }}
                  name="Oname_byadmin"
                  value={this.state.Oname_byadmin}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Password</label>
                <Input
                  placeholder="********"
                  style={{ border: "none" }}
                  name="Opassword_byadmin"
                  value={this.state.Opassword_byadmin}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <Col span={12}>
                <label style={{ fontWeight: "800" }}>Email</label>
                <Input
                  placeholder="jammy_white@aol.com"
                  style={{ border: "none" }}
                  name="Oemail_byadmin"
                  value={this.state.Oemail_byadmin}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Divider style={{ padding: 0, marginTop: 5, marginBottom: 15 }} />

              <button
                onClick={this.handleSubmitO_Byadmin.bind(this)}
                style={{ width: "100%" }}
              >
                Edit
              </button>
            </Row>
          </div>
        </Modal>

        <Modal
          centered={true}
          width={1200}
          title={"Operator Information"}
          visible={this.state.visible_history}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Table
            dataSource={this.state.data_histories}
            columns={columns_history}
          />

          <Button onClick={this.DownloadCSV.bind(this)}> View History</Button>
        </Modal>

        <Modal
          centered={true}
          width={200}
          title={"Operator History"}
          visible={this.state.download_csv}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <CSVLink
            data={this.state.csv_data}
            onClick={() => {
              this.setState({ download_csv: false });
            }}
          >
            Download
          </CSVLink>
        </Modal>
      </div>
    );
  }
}

AdminStuff.propTypes = {
  addDentist: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    addDentist,
    UpdateDentistByAdmin,
    UpdateDentistSubscriptionByadmin,
    UpdateOpertorByAdmin
  }
)(withRouter(AdminStuff));

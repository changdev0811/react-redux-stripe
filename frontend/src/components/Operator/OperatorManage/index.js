import React from 'react';
import { Avatar, Row, Col, Card, Table, Button, Modal, Collapse, Input, Progress, Select, message } from 'antd';
import { logoutUser, AddRemarkDocument, AddHistory, UpdateDocument } from '../../../actions/authentication';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const Panel = Collapse.Panel;
var newData;
var item, index
const useradmin = JSON.parse(localStorage.getItem("UserAdmin"));
const { TextArea } = Input;
const Option = Select.Option;

class OperatorManage extends React.Component {

  constructor() {
    super();
    this.state = {
      data_document: [],
      data_operators: [],
      model_view: false,
      visible_editMange: false,
      status: 'Un successful',
      operator_id: '',
      operator_name: '',
      dentist_id: '',
      dentist_name: '',
      remarks: '',
      store: '',
      admin_info: [],
      name: '',
      email: '',
      operator_status: 'In Progress',
      id: '',
      file_name: localStorage.getItem('files'),
      file_directory: localStorage.getItem('directory'),

      dummy : [
        { firstname: "1111", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "2222", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "3333", lastname: "Min l3b", email: "ymin@cocococo.com" }
    ]
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeOperator = this.handleChangeOperator.bind(this);

    this.columns = [{
      title: 'File',
      dataIndex: 'Filename',
      key: 'Filename',
    }, {
      title: 'Dentist',
      dataIndex: 'dentist_name',
      key: 'dentist_name',
      onFilter: (value, record) => record.dentist_name.indexOf(value) === 0,
      sorter: (a, b) => a.dentist_name.length + b.dentist_name.length,
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length + b.status.length,
    }, {
      title: 'Active Statusbar',
      key: 'status1',
      dataIndex: 'status',
      render: text => text === 'Successful'
        ? <Progress percent={100} />
        : text === 'Un Successful'
          ? <Progress percent={50} status="exception" showInfo={false} />
          : <Progress percent={50} showInfo={false} />
    }, {
      title: 'Date',
      key: 'created_date',
      dataIndex: 'created_date',
      onFilter: (value, record) => record.created_date.indexOf(value) === 0,
      sorter: (a, b) => { return a.created_date.localeCompare(b.created_date) },
      render: text => <span>{text.replace('T', ' ').substring(0, 19)}</span>
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button style={{ backgroundColor: '#00a99d', color: '#fff' }} onClick={() => this.handleView(record)} >Click here</Button>
        </span>
      ),
    }];

  }

  state = {
    profile: false,
    subscription: false,
    manage: false,
  }

  handleClick() {

    if (!this.state.remarks) {
      message.error('Your remark content is empty!');
      return false;
    }

    const update_data = {
      operator_id: this.state.id,
      operator_name: this.state.name,
      content: this.state.remarks,
      status: this.state.operator_status
    }

    const history_data = {
      operator_id: this.state.id,
      operator_name: this.state.name,
      remark: this.state.remarks,
      status: this.state.operator_status,
      dentist_name: this.state.dentist_name,
      dentist_id: this.state.dentist_id,
    }

    const update_operator_data = {
      status: this.state.operator_status
    }

    const getDate = { dentist_name: item.dentist_name, status: this.state.operator_status, _id: item._id, Filename: item.Filename, created_date: item.created_date, operator_name: item.operator_name }

    newData.splice(index, 1, {

      ...getDate,
      ...null,

    });

    this.setState({ data_document: newData, visible_editMange: false });

    this.props.UpdateDocument(update_operator_data, item._id, this.props.history);
    this.props.AddRemarkDocument(update_data, item._id, this.props.history);
    this.props.AddHistory(history_data, this.props.history);

  }

  componentDidMount() {

    axios.get('/api/documents/operator/' + useradmin)
      .then(res => {
        const data_document = res.data;
        this.setState({ data_document });
      });

    axios.get('/api/members/' + useradmin)
      .then(res => {
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          id: res.data.data._id,
        });
      });

    axios.get('/api/members/operator')
      .then(res => {
        const data_operators = res.data;
        this.setState({ data_operators });
      });
  }

  handleView = (row) => {

    this.setState({
      visible_editMange: !this.state.visible_editMange,
      remarks: ''
    })

    newData = [...this.state.data_document];
    index = newData.findIndex(item => item._id === row._id);
    localStorage.setItem("directory", row.directory);
    localStorage.setItem("files", row.Filename);

    console.log('my server data', row)

    this.state.dentist_id = row.dentist_id;
    this.state.dentist_name = row.dentist_name;
    item = newData[index];
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin", 500)
  }

  handleOk = (e) => {
    this.setState({
      visible_editMange: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible_editMange: false,

    });
  }

  handleChange = (value) => {
    this.setState({
      operator_status: value
    })
  }

  handleChangeOperator = (e, array) => {

    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === e) {
        this.setState({
          operator_id: array[i].name
        })
      }
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: '#e7ebee' }}>
        <Row>

          <Col xs={10} md={4} className="sidebar" style={{ position: 'fixed', height: '100vh' }}>

            <div>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" alt="Smiley face" height="50" width="120"></img>
                <br /><br />
                <Avatar src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" style={{ width: 110, height: 110 }} />
                <br /><br /><br />
                <span className="text-muted" style={{ color: '#fff' }}>{this.state.name}</span>
                <br />
                <strong style={{ color: '#fff' }}>{this.state.email}</strong>
              </div>
              <a style={{ position: 'absolute', bottom: 20, color: '#fff', left: '40%', cursor: 'point' }} onClick={this.onLogout.bind(this)}>sign out</a>
            </div>

          </Col>

          <Col xs={10} md={4} className="sidebar" style={{ position: 'relative' }}></Col>

          <Col xs={14} md={20}>
            <Link to="/">
              <Button style={{ marginLeft: 100, marginTop: 40, backgroundColor: '#00a99d', color: '#fff', width: 120, height: 50 }}>Back</Button>
            </Link>
            <div className="card-view" >
              <Card>
                <Table columns={this.columns} dataSource={this.state.data_document} />
              </Card>

              <CSVLink data={this.state.dummy}>
                <Button type="primary" style={{ float: "right", marginLeft: 20, marginTop: 20 }}>Main 2</Button>
              </CSVLink>

              <CSVLink data={this.state.dummy}>
                <Button type="primary" style={{ float: "right", marginTop: 20 }}>Main 1</Button>
              </CSVLink>
            </div>

          </Col>
        </Row>

        <Modal
          centered={true}
          title={"File Manage"}
          visible={this.state.visible_editMange}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <a href={this.state.file_directory} download target="_blank" type="file">FileName: {this.state.file_name}</a>
          <Collapse bordered={false}>

            <Panel header="Status In Progress: " key="1">

              <span style={{ marginLeft: 20 }}>Edit: </span>
              <Select
                showSearch
                defaultValue="In progress"
                style={{ width: 200 }}
                placeholder="Select status"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="In progress" >In progress</Option>
                <Option value="Un Successful">Un Successful</Option>
                <Option value="Successful">Successful</Option>

              </Select>
              <br />
              <br />
            </Panel>
          </Collapse>

          <Collapse bordered={false}>
            <Panel header="Remarks: " key="1">
              <span style={{ marginLeft: 20 }}>Edit: </span>
              <br />
              <TextArea value={this.state.remarks} name="remarks" onChange={this.handleInputChange.bind(this)} rows={4} />

            </Panel>
          </Collapse>

          <button style={{ width: '100%', marginTop: 20 }} onClick={this.handleClick.bind(this)} className="btn btn-primary" >
            Save
          </button>
        </Modal>

      </div>
    );
  }
}

OperatorManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  AddRemarkDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser, AddRemarkDocument, AddHistory, UpdateDocument })(withRouter(OperatorManage))
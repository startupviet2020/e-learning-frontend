import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  Modal,
  Table
} from "react-bootstrap";
import Select from 'react-select';
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox.jsx";


class ImportCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal = () => {
    this.setState({
      showModal: true
    });
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  }

  componentDidMount() {

  }


  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.onCloseModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Import danh sách khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title=""
                  content={
                    <div>
                      <CustomCheckbox label="The first row contains the label of the column" />    
                      <Table responsive className="table-bigboy">
                        <thead>
                          <tr>
                            <th className="text-left">Tên khách hàng</th>
                            <th className="text-left hide-on-mobile">Địa chỉ</th>
                            <th className="text-left hide-on-mobile">Mô tả</th>
                            <th className="text-left hide-on-mobile">Mã số thuế</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>
                                <Select
                                  placeholder={`Tên khách hàng`}
                                  className={"validate-error"}
                                />
                              </td>
                              <td>
                              <Select
                                  placeholder={`Địa chỉ`}
                                  className={"validate-error"}
                                />
                              </td>
                              <td>
                              <Select
                                  placeholder={`Mô tả`}
                                  className={"validate-error"}
                                />
                              </td>
                              <td>
                              <Select
                                  placeholder={`Mã số thuế`}
                                  className={"validate-error"}
                                />
                              </td>
                            </tr>
                        </tbody>
                      </Table>
                      <div class="btn-toolbar" role="toolbar">
                        <div class="btn-group mr-2" role="group">
                          <Button>Chọn tệp</Button>
                        </div>
                        <div class="btn-group mr-2" role="group">
                          <Button>Thực hiện</Button>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ImportCustomer);


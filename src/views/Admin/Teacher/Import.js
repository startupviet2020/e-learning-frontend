import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CustomCheckbox from "components/CustomCheckbox/CustomCheckbox.jsx";


class ImportProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrivers: [],
      searchResults: {},
      phone: '',
      id: ''
    };
  }

  componentDidMount() {
    //this.loadData();
  }

  loadData() {

  }



  // renderActions = () => {
  //   return (
  //     <Button bsStyle="danger" fill sm >
  //       Xoá
  //     </Button>
  //   );
  // }

  render() {

    return (
      <div className="main-content">
        <Grid fluid>

          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <div>
                    <Link to="#" className="btn btn-info btn-fill ">Chọn tệp</Link>&nbsp;
                    <Link to="#" className="btn btn-info btn-fill ">Thực hiện</Link>&nbsp;
                    <Link to="/setup/products" className="btn btn-info btn-fill ">Huỷ bỏ</Link>
                    <h2>Mapping column to import</h2>
                    
                          <CustomCheckbox label="The first row contains the label of the column" />
                        
                    <Table responsive className="table-bigboy">
                      <thead>

                        <tr>
                          <th className="text-left">Tên sản phẩm</th>
                          <th className="text-left hide-on-mobile">Đơn vị tính</th>
                          <th className="text-right hide-on-mobile">Đơn giá</th>
                          <th className="text-left hide-on-mobile">Mô tả</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {
                          <tr>
                            <td>
                              <Select
                                placeholder={`Tên sản phẩm`}
                                className={"validate-error"}
                              />
                            </td>

                            <td>
                            <Select
                                placeholder={`Đơn vị tính`}
                                className={"validate-error"}
                              />
                            </td>

                            <td>
                            <Select
                                placeholder={`Đơn giá`}
                                className={"validate-error"}
                              />
                            </td>

                            <td>
                            <Select
                                placeholder={`Mô tả`}
                                className={"validate-error"}
                              />
                            </td>


                          </tr>
                        }
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
};

const mapStateToProps = null;
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ImportProduct);


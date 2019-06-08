import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class IssueInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <div>
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Xếp loại</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Sếp loại" maxLength="20" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Nhận xét</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Nhận xét " maxLength="20" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Điểm từ</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Điểm từ" maxLength="7" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Đến điểm</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Đến điểm" maxLength="7" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-8">

                        </div>
                        <div className="col-xs-4">
                          <Button bsStyle="info" pullRight fill type="button">Cập nhật</Button>
                        </div>
                      </div>
                      

                      <div className="clearfix" />
                    </form>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(IssueInvoice);


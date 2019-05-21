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
                            <ControlLabel>Mẫu số hoá đơn</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Mẫu số hoá đơn" maxLength="20" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Ký hiệu hoá đơn</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Ký hiệu hoá đơn" maxLength="20" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Từ số</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Từ số" maxLength="7" type="text" />
                          </FormGroup>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Đến số</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Đến số" maxLength="7" type="text" />
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


import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Upload from "components/Upload.jsx";
//import { updateProduct } from '../../actions/product';

class EditTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      product: this.getEmptyProduct()
    };
  }

  componentDidMount() {

  }

  getEmptyProduct = () => {
    return {
      id: 0,
      name: "",
      unit: "",
      price: 0.0,
      description: "",
      status: 1
    };
  }

  handleChange = (e) => {
    const product = this.state.product;
    const target = e.target;
    product[target.name] = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      product
    );
  }

  showModal = (product) => {
    if (product === null) {
      product = this.getEmptyProduct();
    }
    this.setState({
      showModal: true,
      product
    });
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  }

  onUpdate = () => {
    const product = this.state.product;
    this.props.updateProduct(product).then(
      (response) => {
        if (response.success) {
          this.setState({
            showModal: false
          });
          if (this.props.onProductUpdated) {
            product.id = response.result;
            this.props.onProductUpdated(product);
          }
        }
      }
    );
  }

  render() {
    const product = this.state.product;
    return (
      <Modal show={this.state.showModal} onHide={this.onCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                              <ControlLabel>Lớp học</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Tên sản phẩm" maxLength="250" type="text" name="name" value={product.name} onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Khóa học</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Đơn vị" maxLength="20" type="text" name="unit" value={product.unit} onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Logo</ControlLabel>
                            <Upload />
                          </FormGroup>
                      </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="checkbox">
                              <input type="checkbox" id="product_status" name="status" checked={product.status} onChange={this.handleChange}/>
                              <label htmlFor="product_status">Đang hoạt động</label>
                            </div>
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
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <Button bsStyle="info" fill type="button" onClick={this.onUpdate}>Cập nhật</Button>&nbsp;
            <Button bsStyle="info" fill type="button" onClick={this.onCloseModal}>Đóng</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    //updateProduct: (data) => dispatch(updateProduct(data))
  }
)

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditTeacher);


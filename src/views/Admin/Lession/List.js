import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import EditProduct from './Edit';
import image1 from '../../../assets/img/baigiang.jpg';

// import { getProducts, updateProduct, deleteProduct } from '../../actions/product';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      confirmDialog: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    // this.props.getProducts(null).then(
    //   (response) => {
    //     if (response.success) {
    //       this.setState({
    //         products: response.result
    //       });
    //     }
    //   }
    // );
  }

  editProduct = (e, product) => {
    e.preventDefault();
    this.editDialog.getWrappedInstance().showModal(product);
  }

  onProductUpdated = (product) => {
    let isNew = true;
    const products = this.state.products.map(
      (c) => {
        if (c.id !== product.id) {
          return c;
        }
        isNew = false;
        return product;
      }
    );
    if (isNew) {
      products.push(product);
    }
    this.setState({
      products
    });
  }

  importProduct = () => {
    //this.importDialog.getWrappedInstance().showModal();
  }

  deleteProduct = (e, product) => {
    e.preventDefault();
    const confirmDialog = (
      <SweetAlert
        style={{ display: "block" }}
        title={<small>Bạn chắc chắn xoá sản phẩm:</small>}
        onConfirm={() => this.onConfirmDeleteProduct(product)}
        onCancel={() => this.setState({ confirmDialog: null })}
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="info"
        confirmBtnText="Xoá"
        cancelBtnText="Đóng"
        showCancel
      >
        <strong>{product.name}</strong>
      </SweetAlert>
    );
    this.setState({ confirmDialog });
  }

  onConfirmDeleteProduct = (product) => {
    this.setState({ confirmDialog: null });
    this.props.deleteProduct(product.id).then(
      (response) => {
        if (response.success) {
          const products = this.state.products.filter(
            p => p.id !== product.id
          );
          this.setState({ products });
        }
      }
    );
  }

  renderActionButtons = (product) => (
    <div>
      <Button simple icon bsStyle="info" onClick={(e) => this.editProduct(e, product)}>
        <i className="fa fa-edit" />
      </Button>
      <Button simple icon bsStyle="danger" onClick={(e) => this.deleteProduct(e, product)}>
        <i className="fa fa-times" />
      </Button>
    </div>
  );

  render() {
    const products = this.state.products;
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="row">
                <div className="col-md-11">
                  <form>
                    <FormGroup>
                      <FormControl type="text" placeholder="Tìm kiếm..." />
                    </FormGroup>
                  </form>
                </div>
                <div className="col-md-1">
                  <Button bsStyle="info" fill type="button" >Tìm</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <div>
                    <div className="btn-toolbar" role="toolbar">
                      <div className="btn-group mr-2" role="group">
                        <Button bsStyle="info" fill onClick={(e) => this.editProduct(e, null)}>Thêm mới</Button>
                      </div>
                      <div className="btn-group mr-2" role="group">
                        <Button bsStyle="info" fill onClick={this.importProduct}>Import</Button>
                      </div>
                    </div>
                    <hr></hr>
                    <Table responsive className="table-bigboy">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Hình ảnh</th>
                          <th>Tên bài giảng</th>
                          <th>Chuyên đề</th>
                          <th>Khóa học</th>
                          <th>Câu hỏi test quiz</th>
                          <th>Học thử</th>
                          <th>Trạng thái</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>
                            <div>1</div>
                          </td>
                          <td>
                          <div><img width={100} height={100} src={image1}  alt="Logo" /></div>
                          </td>
                          <td>
                            <div>1.Vận tốc</div>
                          </td>
                          <td><div>Số thập phân</div> </td>
                          <td><div>HHQ50</div> </td>
                          <td><div>Import excel</div> </td>
                          <td><div>Có</div> </td>
                          <td><div>Active</div>
                          </td>
                          <td>{this.renderActionButtons(null)}</td>
                        </tr>
                        <tr>
                        <td>
                            <div>1</div>
                          </td>
                          <td>
                          <div><img width={100} height={100} src={image1}  alt="Logo" /></div>
                          </td>
                          <td>
                            <div>1.Quãng đường</div>
                          </td>
                          <td><div>Số thập phân</div> </td>
                          <td><div>HHQ50</div> </td>
                          <td><div>Import excel</div> </td>
                          <td><div>Có</div> </td>
                          <td><div>Active</div></td>
                          <td>{this.renderActionButtons(null)}</td>
                        </tr>
                        <tr>
                        <td>
                            <div>1</div>
                          </td>
                          <td>
                          <div><img width={100} height={100} src={image1} alt="Logo" /></div>
                          </td>
                          <td>
                            <div>1.Thời gian</div>
                          </td>
                          <td><div>Số thập phân</div> </td>
                          <td><div>HHQ50</div> </td>
                          <td><div>Import excel</div> </td>
                          <td><div>Có</div> </td>
                          <td><div>Active</div></td>
                          <td>{this.renderActionButtons(null)}</td>
                        </tr>
                        {/* {
                          products.map((p) => (
                            <tr key={p.id}>
                              <td>
                                <div>{p.name}</div>
                              </td>
                              <td>
                                <div>{p.unit}</div>
                              </td>
                              <td>
                                <div className="text-right">{p.price}</div>
                              </td>
                              <td>
                                <div>{p.description}</div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <span className="btn-label">
                                    <i className="fa fa-check" />
                                  </span>
                                </div>
                              </td>
                              <td className="text-right">{this.renderActionButtons(p)}</td>
                            </tr>
                          ))
                        } */}
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
        <EditProduct ref={(el) => { this.editDialog = el; }} onProductUpdated={this.onProductUpdated} />
        {this.state.confirmDialog}
      </div>
    );
  }
};

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    // getProducts: (filter) => dispatch(getProducts(filter)),
    // updateProduct: (data) => dispatch(updateProduct(data)),
    // deleteProduct: (id) => dispatch(deleteProduct(id))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);


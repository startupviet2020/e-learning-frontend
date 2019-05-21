import React from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { FormControl } from 'react-bootstrap';
import { getProducts } from '../../actions/product';
import CellStyles from './Style';

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      line: props.data
    };
    this.ref = null;
    this.products = [];
  }

  loadProducts = (input, cb) => {
    const filter = {
      s: ""
    };
    if (input) {
      filter.s = input;
    }
    this.props.getProducts(filter).then(
      (response) => {
        if (response.success) {
          this.products = response.result;
          const options = response.result.map(p => (
            {value: p.id, label: p.name}
          ));
          cb(options);
        }
      }
    );
  }

  onProductChange = (item, action) => {
    const product = this.products.find(p => p.id === item.value);
    if (product) {
      const line = this.state.line;
      line.productId = product.id;
      line.unit = product.unit;
      line.price = product.price;
      line.quantity = 1;
      line.cost = product.price;
      this.setState({
        line
      });
    }
  }

  renderDragHandler = (draggableProvided) => {
    return (
      <td style={CellStyles.dragHandler}><i className="fa fa-arrows" {...draggableProvided.dragHandleProps}/></td>
    );
  }

  renderAction = () => {
    return (
      <td style={CellStyles.action}><a href=""><i className="fa fa-trash" /></a></td>
    );
  }

  renderProductLine = (item) => {
    if (this.state.editable) {
      return this.renderEditableProductLine(item);
    } else {
      return this.renderNoneEditableProductLine(item);
    }
  }

  renderEditableProductLine = (item) => {
    return (
      <React.Fragment>
        <td style={CellStyles.product}>
          <AsyncSelect
            placeholder={`Chọn sản phẩm`}
            cacheOptions
            defaultOptions
            loadOptions={this.loadProducts}
            styles={{ control: (base, _state) => ({...base, minHeight: '30px', height: '30px'})}}
            onChange={this.onProductChange}
          />
        </td>
        <td style={CellStyles.unit}>
          <FormControl placeholder="Đơn vị tính" maxLength="50" type="text" bsSize="sm" value={item.unit}/>
        </td>
        <td style={CellStyles.quantity}>
          <FormControl placeholder="Số lượng" maxLength="50" type="text" bsSize="sm" value={item.quantity}/>
        </td>
        <td style={CellStyles.price}>
          <FormControl placeholder="Đơn giá" maxLength="50" type="text" bsSize="sm" value={item.price}/>
        </td>
        <td style={CellStyles.cost}>
          <FormControl placeholder="Thành tiền" maxLength="50" type="text" bsSize="sm" value={item.cost}/>
        </td>
      </React.Fragment>
    )
  }

  renderNoneEditableProductLine = (item) => {
    return [
      <td style={CellStyles.product} key="1">
        {item.name}
      </td>,
      <td style={CellStyles.unit} key="2">
        {item.unit}
      </td>,
      <td style={CellStyles.quantity} key="3">
        {item.quantity}
      </td>,
      <td style={CellStyles.price} key="4">
        {item.price}
      </td>,
      <td style={CellStyles.cost} key="5">
        {item.cost}
      </td>,
    ];
  }

  renderCommentLine = (item) => {
    if (this.state.editable) {
      return this.renderEditableCommentLine(item);
    } else {
      return this.renderNoneEditableCommentLine(item);
    }
  }

  renderEditableCommentLine = (item) => {
    return (
      <td style={CellStyles.comment} colSpan="5">
        <FormControl placeholder="Ghi chú" maxLength="200" type="text" bsSize="sm" defaultValue={item.note}/>
      </td>
    );
  }

  renderNoneEditableCommentLine = (item) => {
    return (
      <td style={CellStyles.comment} colSpan="5">
        {item.note}
      </td>
    );
  }

  render() {
    const {draggableProvided, snapshotProvided} = this.props;
    const data = this.state.line;
    return (
      <tr ref={(id) => {draggableProvided.innerRef(id); this.ref = id; }} {...draggableProvided.draggableProps}>
        {this.renderDragHandler(draggableProvided)}
        {data.type == 0 && this.renderProductLine(data)}
        {data.type == 1 && this.renderCommentLine(data)} 
        {this.renderAction()}
      </tr>
    )
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    getProducts: (filter) => dispatch(getProducts(filter))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Line);
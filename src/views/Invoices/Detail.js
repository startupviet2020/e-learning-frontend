import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Line from './Line';
import CellStyles, { TableWidth } from './Style';

class InvoiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        
      ]
    };
  }

  onNewProduct = (e) => {
    e.preventDefault();
    const lines = this.state.lines;
    lines.push({
      id: lines.length + 1,
      productId: 0,
      type: 0,
      name: "",
      unit: "",
      quantity: 0,
      price: 0,
      cost: 0
    });
    this.setState({
      lines
    });
  }

  onNewComment = (e) => {
    e.preventDefault();
    const lines = this.state.lines;
    lines.push({
      id: lines.length + 1,
      type: 1,
      note: "Chú thích"
    });
    this.setState({
      lines
    });
  }

  onBeforeDragStart = () => {
    
  };

  onDragStart = () => {
    
  };

  onDragUpdate = () => {
    
  };

  onDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const lines = this.reorder(
      this.state.lines,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      lines,
    });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  render() {
    const lines = this.state.lines;
    return (
      <DragDropContext
        onBeforeDragStart={this.onBeforeDragStart}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <table className="table-bigboy table" style={{width: TableWidth, tableLayout: "fixed"}}>
          <thead>
            <tr>
              <th style={CellStyles.dragHandler}>&nbsp;</th>
              <th style={CellStyles.product}>Tên sản phẩm</th>
              <th style={CellStyles.unit}>Đơn vị tính</th>
              <th style={CellStyles.quantity}>SL</th>
              <th style={CellStyles.price}>Đơn giá</th>
              <th style={CellStyles.cost}>Thành tiền</th>
              <th style={CellStyles.action}>&nbsp;</th>
            </tr>
          </thead>
          <Droppable droppableId="table">
            {(droppableProvided) => (
              <tbody
                ref = {droppableProvided.innerRef}
              >
                {this.state.lines.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided, snapshotProvided) => (
                      <Line draggableProvided={draggableProvided} snapshotProvided={snapshotProvided} data={item} />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
        <div style={{marginLeft: "10px", marginTop: "10px"}}>
          <a href="" onClick={this.onNewProduct}>thêm sản phẩm</a> | <a href="" onClick={this.onNewComment}>thêm ghi chú</a>
        </div>
      </DragDropContext>
    );
  }
}

export default InvoiceDetail;
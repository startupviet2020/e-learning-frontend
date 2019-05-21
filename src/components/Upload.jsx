import React from 'react';
import PropTypes from 'prop-types';
import accepts from 'attr-accept';
import ico from "assets/img/ico-upload.svg";

function getDataTransferFiles(event) {
  let dataTransferItemsList = [];
  if (event.dataTransfer) {
    const dt = event.dataTransfer;
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }

  if (dataTransferItemsList.length > 0) {
    dataTransferItemsList = [dataTransferItemsList[0]];
  }
  return Array.prototype.slice.call(dataTransferItemsList);
}

export default class Upload extends React.Component {
  static propTypes = {
    previewUrl: PropTypes.string,
    disabled: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      previewUrl: null
    };
  }

  onClick = (e) => {
    if (this.props.disabled) {
      return;
    }
    e.stopPropagation();

    this.fileInputEl.value = null;
    this.fileInputEl.click();
  }
  
  onDrop = (e) => {
    e.preventDefault();
    const fileList = getDataTransferFiles(e);
    const file = fileList[0];

    if (file.size > 20*1024*1024) {
      return;
    }

    if (!accepts(file, ['image/png', 'image/jpeg'])) {
      return;
    }
    const previewUrl = window.URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      this.resizeImage(img).then(
        (blob) => {

        }, error => {
          
        }
      );
    }
    img.src = previewUrl;

    this.setState({
      file,
      previewUrl
    });
  }

  resizeImage = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    let ratio = 1;
    
    if (img.width > 640)
        ratio = 640 / img.width;
    else if (img.height > 480)
        ratio = 480 / img.height;
  
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    const promise = new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.90);
    });
    return promise;
  }

  render() {
    const previewUrl = this.state.previewUrl || this.props.previewUrl;
    return (
      <React.Fragment>
        <div className="fileupload-area" onClick={this.onClick} >
          <div style={{width: '100%', height: "100%"}}>
            {previewUrl !== "" && <img alt='' src={previewUrl} style={{maxHeight: 130, maxWidth: '100%'}} ref={(el) => {this.previewImg = el;}} />}
          </div>
          <div className="fileupload-area-inner">
            <img alt='' src={ico}/>
          </div>
        </div>
        <input ref={(el) => { this.fileInputEl = el; }} accept="image/*" multiple={false} style={{display: 'none'}} type="file" onChange={this.onDrop}/>
      </React.Fragment>
    );
  }
}
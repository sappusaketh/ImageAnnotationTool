import React from 'react';
import ReactCursorPosition from 'react-cursor-position';
import { ResizableBox } from 'react-resizable';

import { getImage, addImage, editImage } from '../api/api';
import ImageComponent from './ImageComponent';
import deleteElementByClass from '../utils/deleteElementByClass';

const defaultState = {
  height: 200,
  width: 200,
  annotation: '',
  prevImage: '',
  nextImage: ''
};

export default class PhotoInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upload: false,
      imageUrl: null,
      image: null,
      imageId: null,
      respose: null,
      ...defaultState,
      BoundingBox: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.setBoundingBox = this.setBoundingBox.bind(this);
  }

  componentDidMount() {
    getImage('latest')
      .then(res => {
        if (typeof res === 'string') {
          this.setState({ respose: res });
        } else {
          const { image, prevImage, nextImage } = res;
          this.setState({
            imageId: image._id,
            imageUrl: image.imageurl,
            annotation: image.text,
            height: image.height,
            width: image.width,
            prevImage,
            nextImage
          });
        }
      })
      .catch(err => console.log(err));
  }

  setBoundingBox(BoundingBox) {
    this.setState({
      BoundingBox: BoundingBox
    });
  }
  // Add/Edit image hadler
  handleClick(e) {
    const {
      image,
      height,
      width,
      annotation,
      BoundingBox,
      imageId
    } = this.state;
    if (e.target.value === 'Add New') {
      addImage(image, height, width, annotation, BoundingBox)
        .then(res => {
          if (res.status === 200) {
            deleteElementByClass('rectangle');
            this.componentDidMount();
            this.setState({
              upload: false,
              BoundingBox: []
            });
            document.getElementById('image').value = '';
          }
          alert(res.data);
        })
        .catch(err => console.log(err));
    } else if (e.target.value === 'Save Changes') {
      editImage(imageId, annotation, height, width, BoundingBox)
        .then(res => {
          if (res) {
            deleteElementByClass('rectangle');
            this.setState({ BoundingBox: [] });
            alert('Changes saved succesfully');
          }
        })
        .catch(err => console.log(err));
    }
  }

  // Next/Prev button handler
  handleMove(e) {
    let imageId;
    if (e.target.name === 'previous') {
      imageId = this.state.prevImage[0]._id;
    } else if (e.target.name === 'next') {
      imageId = this.state.nextImage[0]._id;
    }
    deleteElementByClass('rectangle');
    getImage(imageId).then(({ image, prevImage, nextImage }) => {
      this.setState({
        imageId: image._id,
        height: image.height ? image.height : 200,
        width: image.width ? image.width : 200,
        imageUrl: image.imageurl,
        annotation: image.text,
        prevImage,
        nextImage
      });
    });
  }

  // Form Input Change handler function
  handleChange(e) {
    if (e.target.type !== 'file') {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        upload: true,
        ...defaultState,
        [e.target.name + 'Url']:
          e.target.files[0] && URL.createObjectURL(e.target.files[0]),
        [e.target.name]: e.target.files[0]
      });
    }
  }

  onResize = (event, { element, size, handle }) => {
    this.setState({
      width: size.width,
      height: size.height
    });
  };

  render() {
    const {
      imageUrl,
      height,
      width,
      annotation,
      upload,
      prevImage,
      nextImage,
      remove
    } = this.state;
    return (
      <>
        <div className='imgInput'>
          <label htmlFor='image'>Upload Image: </label>
          <input
            id='image'
            type='file'
            name='image'
            accept='.jpg, .png'
            onChange={this.handleChange}
          />
        </div>

        {imageUrl && (
          <>
            <div className='imgForm'>
              <label htmlFor='height'>Height: </label>
              <input
                type='number'
                name='height'
                id='height'
                value={height}
                onChange={this.handleChange}
              />{' '}
              <label htmlFor='width'>Width: </label>
              <input
                type='number'
                name='width'
                id='width'
                value={width}
                onChange={this.handleChange}
              />{' '}
              <label htmlFor='annotation'>Annotation Text: </label>
              <input
                type='text'
                name='annotation'
                id='annotation'
                value={annotation}
                onChange={this.handleChange}
              />{' '}
            </div>
            <br />
            <div className='imgCtrlbtn'>
              {prevImage.length ? (
                <button name='previous' onClick={this.handleMove}>
                  Previous
                </button>
              ) : (
                <button name='previous' disabled>
                  Previous
                </button>
              )}
              <input
                type='button'
                name='submit'
                id='submit'
                value={upload ? 'Add New' : 'Save Changes'}
                onClick={this.handleClick}
              />{' '}
              {nextImage.length ? (
                <button name='next' onClick={this.handleMove}>
                  Next
                </button>
              ) : (
                <button name='next' disabled>
                  Next
                </button>
              )}
            </div>
            <div className='imgView'>
              <ResizableBox
                className='box'
                height={parseInt(height)}
                width={parseInt(width)}
                onResize={this.onResize}
                resizeHandles={['se']}
                minConstraints={[50, 50]}
                maxConstraints={[500, 500]}
              >
                <ReactCursorPosition
                  style={{
                    height: `${height}px`,
                    width: `${width}px`
                  }}
                >
                  <ImageComponent
                    height={height}
                    width={width}
                    image={imageUrl}
                    remove={remove}
                    setBoundingBox={this.setBoundingBox}
                  />
                  <span className='imgAnnotation' style={{ maxHeight: height }}>
                    <p className='m0'>{annotation}</p>
                  </span>
                </ReactCursorPosition>
              </ResizableBox>
            </div>
          </>
        )}
      </>
    );
  }
}

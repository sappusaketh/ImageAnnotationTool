import React from 'react';
import percentToPixelConverter from '../utils/percentToPixelConverter';
import PropTypes from 'prop-types';

const mouse = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
};
let boundingBox = [];
let element = null;

const setMousePosition = props => {
  mouse.x2 = (props.position.x / props.width) * 100;
  mouse.y2 = (props.position.y / props.height) * 100;
};

const imageClick = props => {
  if (element !== null) {
    element = null;
    document.getElementById('imgWrapper').style.cursor = 'default';
    let posInPercent = {};
    posInPercent = { ...mouse };
    posInPercent.width = document.getElementById(
      boundingBox.length
    ).style.width;
    posInPercent.height = document.getElementById(
      boundingBox.length
    ).style.height;
    let posInPixel = percentToPixelConverter(
      posInPercent,
      props.height,
      props.width
    );
    boundingBox.push({ posInPercent, posInPixel });
    props.setBoundingBox(boundingBox);
    console.log('finsihed.');
  } else {
    console.log('started.');
    console.log('x:' + mouse.x2, 'y:' + mouse.y2);
    mouse.x1 = mouse.x2;
    mouse.y1 = mouse.y2;
    element = document.createElement('span');
    element.className = 'rectangle';
    element.id = boundingBox.length;
    element.style.left = mouse.x2 + '%';
    element.style.top = mouse.y2 + '%';

    document.getElementById('imgWrapper').appendChild(element);
    document.getElementById('imgWrapper').style.cursor = 'crosshair';
  }
};

const mouseMove_Image = props => {
  setMousePosition(props);
  if (element !== null) {
    element.style.width = Math.abs(mouse.x2 - mouse.x1) + '%';
    element.style.height = Math.abs(mouse.y2 - mouse.y1) + '%';
    element.style.left =
      mouse.x2 - mouse.x1 < 0 ? mouse.x2 + '%' : mouse.x1 + '%';
    element.style.top =
      mouse.y2 - mouse.y1 < 0 ? mouse.y2 + '%' : mouse.y1 + '%';
  }
};

function ImageComponent(props) {
  return (
    <div
      id='imgWrapper'
      style={{
        height: `${props.height}px`,
        width: `${props.width}px`
      }}
      onClick={() => imageClick(props)}
      onMouseMove={mouseMove_Image(props)}
    >
      <img src={props.image} alt={props.image} id='currImage' />
    </div>
  );
}

ImageComponent.propTypes = {
  props: PropTypes.object
};

export default ImageComponent;

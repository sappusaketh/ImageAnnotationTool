const percentToPixelConvertor = (percent_Obj, height, width) => {
  let pixelObj = {};
  console.log(width);
  for (const key in percent_Obj) {
    if (key === 'x1' || key === 'x2' || key === 'width') {
      pixelObj[key] = (parseInt(percent_Obj[key]) * width) / 100;
    } else if (key === 'y1' || key === 'y2' || key === 'height') {
      pixelObj[key] = (parseInt(percent_Obj[key]) * height) / 100;
    }
  }
  return pixelObj;
};

module.exports = percentToPixelConvertor;

// import React from 'react';
// import percentToPixelConverter from '../utils/percentToPixelConverter';
// import PropTypes from 'prop-types';

// const mouse = {
//   x1: 0,
//   y1: 0,
//   x2: 0,
//   y2: 0
// };
// let boundingBox = [];
// let element = null;

// const setMousePosition = props => {
//   mouse.x = (props.position.x2 / props.width) * 100;
//   mouse.y = (props.position.y2 / props.height) * 100;
// };

// const imageClick = props => {
//   if (element !== null) {
//     element = null;
//     document.getElementById('something').style.cursor = 'default';
//     let posInPercent = {};
//     posInPercent = { ...mouse };
//     posInPercent.width = document.getElementById(
//       boundingBox.length
//     ).style.width;
//     posInPercent.height = document.getElementById(
//       boundingBox.length
//     ).style.height;
//     console.log(posInPercent);
//     let posInPixel = percentToPixelConverter(
//       posInPercent,
//       props.height,
//       props.width
//     );
//     console.log(posInPixel);
//     boundingBox.push({ posInPercent, posInPixel });
//     console.log(boundingBox);
//     console.log('finsihed.');
//   } else {
//     console.log('begun.');
//     console.log('x:' + mouse.x2, 'y:' + mouse.y2);
//     mouse.x1 = mouse.x2;
//     mouse.y1 = mouse.y2;
//     element = document.createElement('span');
//     element.className = 'rectangle';
//     element.id = boundingBox.length;
//     element.style.left = mouse.x2 + '%';
//     element.style.top = mouse.y2 + '%';

//     document.getElementById('something').appendChild(element);
//     document.getElementById('something').style.cursor = 'crosshair';
//   }
// };
// const imageMove = props => {
//   setMousePosition(props);
//   if (element !== null) {
//     element.style.width = Math.abs(mouse.x2 - mouse.x1) + '%';
//     element.style.height = Math.abs(mouse.y2 - mouse.y1) + '%';
//     element.style.left =
//       mouse.x2 - mouse.x1 < 0
//         ? mouse.x2 + '%' /*+ 'px'*/
//         : mouse.x1 + '%' /*+ 'px'*/;
//     element.style.top =
//       mouse.y2 - mouse.y1 < 0
//         ? mouse.y2 + '%' /*+ 'px'*/
//         : mouse.y1 + '%' /*+ 'px'*/;
//   }
// };

// function ImageComponent(props) {
//   return (
//     <div
//       id='something'
//       style={{
//         height: `${props.height}px`,
//         width: `${props.width}px`
//       }}
//       onClick={imageClick(props)}
//       onMouseMove={imageMove(props)}
//     >
//       <img src={props.image} alt='' id='currImage' />
//     </div>
//   );
// }

// ImageComponent.propTypes = {};

// export default ImageComponent;

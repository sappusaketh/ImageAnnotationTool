import axios from 'axios';
// const url = 'http://localhost:5000';

export async function addImage(image, height, width, text, BoundingBox) {
  const fd = new FormData(); //use formdata for multipart upload;
  fd.append('image', image);
  fd.append('height', height);
  fd.append('width', width);
  fd.append('text', text);
  BoundingBox && fd.append('BoundingBox', JSON.stringify(BoundingBox));
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  try {
    let response = await axios.post(`/image/addimage`, fd, config);
    return response;
    // console.log(data);
  } catch (error) {
    return error;
    // console.error(error.response.data);
  }
}

export async function getImage(imageId) {
  try {
    let image = await axios.get(`/image/getimage/${imageId}`);
    return image.data;
  } catch (error) {
    return error;
  }
}

export async function editImage(imageId, text, height, width, BoundingBox) {
  try {
    // BoundingBox && JSON.stringify(BoundingBox);
    let image = await axios.post(`/image/edit/${imageId}`, {
      text,
      height,
      width,
      BoundingBox
    });
    return image.data;
  } catch (error) {
    return error;
  }
}

// getImage('latest').then(data => console.log(data));

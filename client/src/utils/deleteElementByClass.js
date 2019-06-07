const deleteElementByClass = elem => {
  if (document.getElementsByClassName(elem).length !== 0) {
    let ele = document.getElementsByClassName(elem);
    while (ele.length !== 0) {
      let i = ele.length - 1;
      ele[i].parentNode.removeChild(ele[i]);
    }
  }
};

module.exports = deleteElementByClass;

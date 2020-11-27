const imageDataToMatrix = (matrix) => {
  let newMatrix = [];
  let tempMatrix = [];

  for (let i = 3; i < matrix.length; i += 4) {
    tempMatrix.push(matrix[i]);

    if (tempMatrix.length === 308) {
      newMatrix.push(tempMatrix);
      tempMatrix = [];
    }
  }

  const getPixelAvg = (iCor, jCor) => {
    let sum = 0;
    for (let i = iCor * 11; i < iCor * 11 + 11; i++) {
      for (let j = jCor * 11; j < jCor * 11 + 11; j++) {
        sum += newMatrix[i][j];
      }
    }
    return sum / (11 * 11 * 255);
  };

  let finalMatrix = [];
  for (let i = 0; i < 28; i++) {
    tempMatrix = [];
    for (let j = 0; j < 28; j++) {
      tempMatrix.push([getPixelAvg(i, j)]);
    }
    finalMatrix.push(tempMatrix);
  }

  return finalMatrix;
};

////////// svgToMatrix with return
export const svgToMatrix = (svgElement, width, height) =>
  new Promise((resolve) => {
    const loader = new Image();
    const canvasElement = document.createElement("canvas");
    const ctx = canvasElement.getContext("2d");

    loader.width = canvasElement.width = width;
    loader.height = canvasElement.height = height;

    // flatten css styles to svg
    let child;
    for (let i = 0; i < svgElement.childNodes.length; i++) {
      child = svgElement.childNodes[i];
      var cssStyle = window.getComputedStyle(child);
      if (cssStyle) {
        child.style.cssText = cssStyle.cssText;
      }
    }

    // async function that runs when data is loaded into canvas
    loader.onload = () => {
      ctx.drawImage(loader, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      const matrix = imageDataToMatrix(data);

      resolve(matrix);
    };

    const svgAsXML = new XMLSerializer().serializeToString(svgElement);
    loader.src = "data:image/svg+xml," + encodeURIComponent(svgAsXML);
  });

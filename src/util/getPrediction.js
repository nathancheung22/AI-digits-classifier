import { tfModel } from "../config/config";
import { svgToMatrix } from "./svgToMatrix";
import * as tf from "@tensorflow/tfjs";

const sum2dMatrix = (matrix) =>
  matrix.reduce((sum, num) => sum + (Array.isArray(num) ? sum2dMatrix(num) : num * 1), 0);

// takes in SVG element, and spits out prediction
export const getPrediction = async (svgElement) => {
  const { model } = tfModel;

  const inputMatrix = await svgToMatrix(svgElement, 308, 308);

  if (sum2dMatrix(inputMatrix) === 0) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  const inputTensor = tf.tensor([inputMatrix]);

  const predArr = (await model.predict(inputTensor).array())[0];

  return predArr;
};

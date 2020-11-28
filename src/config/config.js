import * as tf from "@tensorflow/tfjs";
import * as myModel from "./model";

const loadModelIfNotPresent = () => {
  for (const [key, value] of Object.entries(myModel)) {
    if (localStorage.getItem(key)) {
      continue;
    }

    if (key === "weight_data") {
      localStorage.setItem(`tensorflowjs_models/tfModel/${key}`, btoa(value));
    } else {
      localStorage.setItem(`tensorflowjs_models/tfModel/${key}`, JSON.stringify(value));
    }
  }
};

// exports an empty object, then asynchronously updates the object
export const tfModel = { model: null };
loadModelIfNotPresent();
tf.loadLayersModel("localstorage://tfModel").then((model) => (tfModel.model = model));

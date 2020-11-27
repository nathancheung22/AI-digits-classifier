import * as tf from "@tensorflow/tfjs";

// exports an empty object, then asynchronously updates the object

export const tfModel = { model: null };
tf.loadLayersModel("http://localhost:5000/model").then((model) => {
  tfModel.model = model;
  // runs the model on a bogus tensor to cache the model
  const bogusMatrix = new Array(28).fill(new Array(28).fill([0]));
  const bogusTensor = tf.tensor([bogusMatrix]);
  model.predict(bogusTensor);
});

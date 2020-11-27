import { DrawArea } from "./components/drawArea/DrawArea";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { Predictions } from "./components/predictions/Predictions";
import { useState } from "react";

const App = () => {
  const [predArr, setPredArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return (
    <div className="app">
      <Container>
        <Row>
          <h1>Handwritten Digits Classifier</h1>
        </Row>
        <Row>
          <h5>Check out my linkedin</h5>
        </Row>

        <DrawArea setPredArr={setPredArr} />

        <Predictions predArr={predArr} />
      </Container>
    </div>
  );
};

export default App;

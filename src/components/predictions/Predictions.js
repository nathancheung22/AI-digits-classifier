import { Col, Row } from "react-bootstrap";
import "./predictions.css";

export const Predictions = (props) => {
  const { predArr } = props;

  const mapPredictionNodes = predArr.map((predVal, index) => {
    const gradientValue = `${(predVal * 100).toFixed(2)}%`;
    const predStyle = {
      backgroundImage: `linear-gradient(to top, #20c997 ${gradientValue}, transparent ${gradientValue})`,
    };

    return (
      <Col key={index}>
        <div className="prediction-box" style={predStyle}>
          <h5>{index}</h5>
        </div>
        <p>{gradientValue}</p>
      </Col>
    );
  });

  return (
    <div>
      <Row style={{ marginTop: "10vh" }}>{mapPredictionNodes}</Row>
    </div>
  );
};

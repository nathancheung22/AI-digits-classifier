import React, { useEffect, useRef, useState } from "react";
import * as Immutable from "immutable";
import "./drawArea.css";
import { Button, Row, Col } from "react-bootstrap";
import { getPrediction } from "../../util/getPrediction";

const DrawingLine = (props) => {
  const { line } = props;
  const pathData = "M " + line.map((p) => `${p.get("x")} ${p.get("y")}`).join(" L ");

  return <path className="path" d={pathData} />;
};

const Drawing = ({ lines }) => (
  <svg className="drawing" id="svg-el">
    {lines.map((line, index) => (
      <DrawingLine key={index} line={line} />
    ))}
  </svg>
);

export const DrawArea = (props) => {
  const { setPredArr } = props;

  const [lines, setLines] = useState(new Immutable.List());
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasHasChanged, setCanvasHasChanged] = useState(false);

  const canvasArea = useRef(null);

  const relativeCoordinatesForEvent = (mouseEvent) => {
    const boundingRect = canvasArea.current.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);

    setIsDrawing(false);
    setCanvasHasChanged(true);
  };

  const handleMouseDown = (mouseEvent) => {
    if (mouseEvent.button === 0) {
      document.addEventListener("mouseup", handleMouseUp);

      const point = relativeCoordinatesForEvent(mouseEvent);

      setLines(lines.push(new Immutable.List([point])));
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (mouseEvent) => {
    if (isDrawing) {
      const point = relativeCoordinatesForEvent(mouseEvent);
      setLines(lines.updateIn([lines.size - 1], (line) => line.push(point)));
    }
  };

  // on canvaschange, getPrediction
  useEffect(() => {
    if (canvasHasChanged === true) {
      // define async function to run
      const runGetPred = async () => {
        const svgElement = document.getElementById("svg-el");
        const predArr = await getPrediction(svgElement, 308, 308);

        setPredArr(predArr);
      };

      runGetPred();
      setCanvasHasChanged(false);
    }
  }, [canvasHasChanged, setPredArr]);

  return (
    <div>
      <Row>
        <Col>
          <div
            className="drawArea"
            ref={canvasArea}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <Drawing lines={lines} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="danger"
              onClick={() => {
                setLines(lines.delete(-1));
                setCanvasHasChanged(true);
              }}
              style={{ margin: "0 30px" }}
            >
              Undo
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                setLines(new Immutable.List());
                setCanvasHasChanged(true);
              }}
              style={{ margin: "0 30px" }}
            >
              Clear
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

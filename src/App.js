import React, { Component, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";
import Controller from "./Components/Controller";
import ImagePreview from "./Components/ImagePreview";
import ImportText from "./Components/ImportText";
import Input from "./Components/Input";
import WebGL from "./WebGL";
import GLC from "./WebGL/GLCommander";
import Update from "./WebGL/Update";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
`;
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 1rem 0;
`;

const App = () => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [src, setSrc] = useState(null);
  const [ableToSave, setAbleToSave] = useState(false);
  const [font, setFont] = useState("Arial");
  const [text, setText] = useState(undefined);
  const [textSize, setTextSize] = useState(undefined);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const img = document.getElementById("source");
    img.onload = () => {
      let nature_width = img.naturalWidth;
      let nature_height = img.naturalHeight;
      setWidth(nature_width);
      setHeight(nature_height);
    };
  }, [src]);
  useEffect(() => {
    if (textSize) {
      GLC.setTextSize(textSize);
    } else setAbleToSave(false);
  }, [textSize]);
  useEffect(() => {
    if (font) {
      GLC.setFont(font);
    }
  }, [font]);
  useEffect(() => {
    Update();
  }, [font, text, textSize, src, x, y]);
  useEffect(() => {
    GLC.setTextCoordinate(x, y);
  }, [x, y]);
  return (
    <AppWrapper>
      <Title>Text to image</Title>
      <Container>
        <ImportText
          OnChangeText={(text) => {
            setText(text);
          }}
          text={text}
        />
        <Controller
          OnChangBackground={(image) => {
            setSrc(image);
          }}
          OnChangeTextSize={(textSize) => {
            console.log("textSize", textSize);
            setTextSize(textSize);
          }}
          size={textSize}
          font={font}
          OnChangeFont={(font) => {
            console.log("font", font);
            setFont(font);
          }}
          OnChangeX={(x) => {
            setX(x);
          }}
          OnChangeY={(y) => {
            setY(y);
          }}
          x={x}
          y={y}
        />

        <ImagePreview image={src} />
        <WebGL width={width} height={height} />
        <Button
          variant={ableToSave ? "secondary" : "primary"}
          onClick={() => {
            GLC.saveCanvasAsImage();
          }}
          disabled={ableToSave}
        >
          Save
        </Button>
      </Container>
    </AppWrapper>
  );
};

export default App;

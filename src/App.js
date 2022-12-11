import React, { Component } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";
import Input from "./Components/Input";
import WebGL from "./WebGL";
import GLC from "./WebGL/GLCommander";

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
const Label = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 1rem 0;
`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.TYPE_INPUT = {
      TEXT: 1,
      FILE_TXT: 2,
    };
    this.FONTS = ["Arial", "Times New Roman", "Courier New"];
    this.state = {
      checked: false,
      src: "",
      width: null,
      height: null,
      text: "",
      textArr: [],
      textSize: 16,
      disable: true,
      typeInput: this.TYPE_INPUT.FILE_TXT,
      font: "Arial",
    };
  }
  componentDidMount() {}
  componentDidUpdate() {
    if (this.state.textSize !== GLC.textSize) {
      GLC.setTextSize(this.state.textSize);
    }
    if (this.state.height !== GLC.height || this.state.width !== GLC.width) {
      GLC.setSize(this.state.width, this.state.height);
    }
    if (this.state.font !== GLC.font) {
      GLC.setFont(this.state.font);
    }
  }
  render() {
    console.log(this.state.typeInput);
    return (
      <AppWrapper>
        <Title>Create Word With Image</Title>

        <Container>
          {/*Select type input*/}
          <Label>Chọn background</Label>
          {this.state.src !== "" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 500,
                height: 400,
                alignSelf: "center",
                overflowY: "auto",
              }}
            >
              <img
                src={this.state.src}
                id="source"
                width={this.state.width}
                alt="ảnh"
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={require("./assets/images/no-data-concept-illustration/empty_image.jpg")}
                id="source"
                width={300}
                alt="ảnh"
              />
              <p>Chưa có ảnh</p>
            </div>
          )}
          {/*pick image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = document.getElementById("source");
                img.src = e.target.result;
                let nature_width = img.naturalWidth;
                let nature_height = img.naturalHeight;
                this.setState({
                  src: e.target.result,
                  // width: 300,
                  // height: 300 * (nature_height / nature_width),
                  width: nature_width,
                  height: nature_height,
                  disable: false,
                });
              };
              reader.readAsDataURL(file);
            }}
          />
          <Label>Chọn cách nhập từ</Label>
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.typeInput === 1 ? "Nhập 1 từ" : "Import file"}
            onSelect={(e) => {
              console.log(e);
              this.setState({ typeInput: parseInt(e) });
            }}
            style={{
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            <Dropdown.Item eventKey={this.TYPE_INPUT.TEXT}>
              Nhập 1 từ
            </Dropdown.Item>
            <Dropdown.Item eventKey={this.TYPE_INPUT.FILE_TXT}>
              Import file
            </Dropdown.Item>
          </DropdownButton>

          {this.state.typeInput === this.TYPE_INPUT.TEXT ? (
            <div>
              <Label>Text</Label>
              <Input
                type="text"
                onChange={(val) => {
                  this.setState({ text: val });
                }}
                value={this.state.text}
              />
              <p id="text" style={{ display: "none" }}>
                {this.state.text}
              </p>
            </div>
          ) : (
            <div>
              <Label>File text</Label>
              <div>
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      console.log(e.target.result);
                      this.setState({ text: e.target.result });
                    };
                    reader.readAsText(file);
                  }}
                />
              </div>

              <p id="text" style={{ display: "none" }}>
                {this.state.text}
              </p>
            </div>
          )}

          <Label>Size text</Label>
          <input
            type="range"
            min={0}
            max={30}
            defaultValue={10}
            value={this.state.textSize}
            onChange={(e) => {
              this.setState({ textSize: e.target.value });
            }}
          />
          <Label>Select font</Label>
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.font}
            onSelect={(e) => {
              console.log("font", e);
              this.setState({ font: e });
            }}
            style={{
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            {this.FONTS.map((font, index) => {
              return (
                <Dropdown.Item eventKey={font} key={index}>
                  {font}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          {/*render image*/}
          <WebGL
            width={this.state.width}
            height={this.state.height}
            textSize={this.state.textSize}
          />

          {/*save image*/}
          <Button
            variant={this.state.disable ? "secondary" : "primary"}
            onClick={() => {
              GLC.saveCanvasAsImage();
            }}
            disabled={this.state.disable}
          >
            Save
          </Button>
        </Container>
      </AppWrapper>
    );
  }
}

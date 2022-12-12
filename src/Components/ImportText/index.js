import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Label } from "../../App";
import { InputWrapper } from "../Controller";
import Input from "../Input";

export default function ImportText({ text, OnChangeText=()=>{} }) {
  const TYPE_INPUT = {
    TEXT: 1,
    FILE_TXT: 2,
  };
  const [typeInput, setTypeInput] = useState(TYPE_INPUT.FILE_TXT);
  return (
    <div>
      <Label>Chọn cách nhập từ</Label>
      <DropdownButton
        id="dropdown-basic-button"
        title={typeInput === TYPE_INPUT.TEXT ? "Nhập 1 từ" : "Import file"}
        onSelect={(e) => {
          console.log("sel", e);
          setTypeInput(parseInt(e));
        }}
        style={{
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <Dropdown.Item eventKey={TYPE_INPUT.TEXT}>Nhập 1 từ</Dropdown.Item>
        <Dropdown.Item eventKey={TYPE_INPUT.FILE_TXT}>
          Import file
        </Dropdown.Item>
      </DropdownButton>

      {typeInput === TYPE_INPUT.TEXT ? (
        <div>
          <Label>Text</Label>
          <Input
            type="text"
            onChange={(val) => {
              OnChangeText(val);
            }}
            value={text}
          />
          <p id="text" style={{}}>
            {text}
          </p>
        </div>
      ) : (
        <div>
          <Label>File text</Label>
          <InputWrapper>
            <input
              type="file"
              accept=".txt"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                  console.log(e.target.result);
                  OnChangeText(e.target.result);
                };
                reader.readAsText(file);
              }}
            />
          </InputWrapper>
          <p id="text" style={{ display: "none" }}>
            {text}
          </p>
        </div>
      )}
    </div>
  );
}

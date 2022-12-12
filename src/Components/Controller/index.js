import React, { memo } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";
import { Label } from "../../App";

export const InputWrapper = styled.div`
  margin: 10px 0;
`;

const Controller = ({
  OnChangBackground = () => {},
  size = 10,
  OnChangeTextSize = () => {},
  font,
  OnChangeFont = () => {},
}) => {
  const FONTS = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Trebuchet MS",
    "Impact",
    "Comic Sans MS",
    "Tahoma",
    "Palatino Linotype",
    "Lucida Console",
    "Lucida Sans Unicode",
    "MS Serif",
    "MS Sans Serif",
    "Book Antiqua",
    "Bookman Old Style",
    "Garamond",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Baskerville Old Face",
    "Bradley Hand ITC",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Copperplate Gothic Bold",
    "Franklin Gothic Medium",
    "Gill Sans MT",
    "Gill Sans MT Condensed",
    "Gill Sans MT Ext Condensed Bold",
    "Harrington",
    "High Tower Text",
    "Jokerman",
    "Kristen ITC",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Fax",
    "Magneto",
    "Maiandra GD",
    "Matura MT Script Capitals",
    "Monotype Corsiva",
    "Niagara Engraved",
    "Niagara Solid",
    "Papyrus",
    "Perpetua",
    "Rockwell",
    "Rockwell Extra Bold",
    "Script MT Bold",
    "Stencil",
    "Viner Hand ITC",
    "Vivaldi",
    "Wide Latin",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
  ];
  return (
    <div>
      <Label>Chọn background</Label>
      <InputWrapper>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
              OnChangBackground(event.target.result);
            };
            reader.readAsDataURL(file);
          }}
        />
      </InputWrapper>

      <Label>Size text</Label>
      <InputWrapper>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={10}
          value={size}
          onChange={(e) => {
            OnChangeTextSize(e.target.value);
          }}
        />
        <label>{size}</label>
      </InputWrapper>

      <Label>Select font</Label>
      <DropdownButton
        id="dropdown-basic-button"
        title={font}
        onSelect={(e) => {
          OnChangeFont(e);
        }}
        style={{
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        {FONTS.map((font, index) => {
          return (
            <Dropdown.Item eventKey={font} key={index}>
              {font}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default memo(Controller);

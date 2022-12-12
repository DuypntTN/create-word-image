import React, { memo } from "react";

const ImagePreview = ({
  image = `
    require("../../assets/images/no-data-concept-illustration/empty_image.jpg")
`,
  width,
}) => {
  return (
    <div
      style={{
        width: 500,
        height: 400,
        overflowY: "auto",
      }}
    >
      {!image ? (
        <img
          src={require("../../assets/images/no-data-concept-illustration/empty_image.jpg")}
          alt="preview"
          id="source"
          style={{
            width: "100%",
          }}
        />
      ) : (
        <img src={image} alt="preview" id="source" width={width} />
      )}
    </div>
  );
};
export default memo(ImagePreview);

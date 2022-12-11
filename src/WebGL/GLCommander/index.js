class GLCommander {
  init(gl, canvas) {
    this.gl = gl;
    this.canvas = canvas;
    this.textSize = 20;
  }
  clear = (r, g, b, a) => {
    console.log("Clearing canvas: ", this.canvas.width);
    this.gl.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gl.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.gl.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  drawScence(x_offset = 0, y_offset = 0) {
    this.gl.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let image = document.getElementById("source");
    let text = document.getElementById("text");
    if (image === null) return;
    this.gl.drawImage(image, x_offset, y_offset, this.canvas.width, this.canvas.height);
    let fontSize = this.textSize;
    let textBox = {
      x: x_offset,
      y: y_offset,
      width: this.canvas.width,
      height: this.canvas.height,
    };
    let textLength = text.innerText.length;
    let index = 0;
    let stringArr = [];
    let string = "";
    while (index < textLength) {
      string += text.innerText[index];
      let textWidth = this.gl.measureText(string).width;
      if (textWidth > textBox.width) {
        stringArr.push(string);
        string = "";
      }
      index++;
    }
    stringArr.push(string);
    for (let i = 0; i < stringArr.length; i++) {
      this.drawText(stringArr[i], textBox.x, textBox.y + fontSize * (i + 1));
    }
  }
  saveCanvasAsImage = () => {
    const dataURL = this.canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my-image.png";
    link.href = dataURL;
    link.click();
  };
  setTextSize = (size) => {
    this.textSize = size;
  };
  drawText(text, x, y) {
    this.gl.font = `${this.textSize}px Arial`;
    this.gl.fillText(text, x, y);
  }
}
const GLC = new GLCommander();
export default GLC;

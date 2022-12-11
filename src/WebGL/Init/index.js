import GLC from "../GLCommander";

const render = () => {
  GLC.clear(1, 1, 1, 1);
  GLC.drawScence();
  // window.requestAnimationFrame(render);
};

export default (id) => {
  id.slice(0, 1) === "#" && (id = id.slice(1));
  const canvas = document.getElementById(`${id}`);
  if (!canvas) {
    throw new Error("No canvas found");
  }
  const gl = canvas.getContext("2d");
  console.log("Context: ", gl);
  if (!gl) {
    throw new Error("No WebGL context found");
  }
  GLC.init(gl, canvas);
  window.requestAnimationFrame(render);
};

import { evaluate_cmap, data } from "./js-colormaps";

// Define function to plot a colormap
function plot_colormap(canvas_id, name, reverse) {
  let canvas = document.getElementById(canvas_id);
  let ctx = canvas.getContext("2d");
  for (let x = 0; x <= 256; x++) {
    let color = evaluate_cmap(x / 256, name, reverse);
    let r = color[0];
    let g = color[1];
    let b = color[2];
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(
      (x * canvas.width) / 256,
      0,
      canvas.width / 256,
      canvas.height
    );
  }
}

// First, add rows and canvases for all colormaps
for (const key in data) {
  document.getElementById("colormaps").innerHTML += `
              <tr>
                <td class="right">${key}</td>
                <td><canvas id="${key}" width="1024" height="50"></canvas></td>
                <td>⟺</td>
                <td><canvas id="${key}_r" width="1024" height="50"></canvas></td>
                <td class="left">${key}_r</td
                </tr>
            `;
}

// Once this has finished (i.e., the canvases exist), plot the colormaps
for (const key in data) {
  plot_colormap(key, key, false);
  plot_colormap(key + "_r", key, true);
}

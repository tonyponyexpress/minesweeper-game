/** Global variables, should be initialized to users input */

let grid;
let cols;
let rows;
let mines;
let width = 20;

var totalBees = 30;

/** Creates a canvas with a 2D array according to the input*/
function setup() {
    rows = document.getElementById("input1").value;
    cols = document.getElementById("input2").value;
    mines = document.getElementById("input3").value;
    createCanvas(cols*width +1, rows*width +1);
    grid = create2DArray(cols, rows);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[c][r] = new Box(c*width, r*width, width);
      }
    }
}

function create2DArray(cols,rows){
  let grid = new Array(cols);
  for (let c=0; c<cols; c++){
    grid[c] = new Array(rows);
  }
  return grid;
}


/** Draws the canvas on the site */
function draw() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

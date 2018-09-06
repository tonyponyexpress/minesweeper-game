/** Global variables, should be initialized to users input */
let grid;
let cols = 10;
let rows = 10;
let width = 40;

var totalBees = 30;

/** Creates a canvas with a 2D array according to the input*/
function setup() {
  createCanvas(cols*width +1, rows*width +1);
  grid = create2DArray(cols, rows);
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
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
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

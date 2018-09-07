/** Global variables, should be initialized to users input */

let grid;
let cols = 0;
let rows = 0;
let width = 20;
let mines = 0;

getInput();

var totalBees = 30;

/** Gets user input for rows, columns, and # of mines */

function getInput(){
  cols = parseInt(document.getElementById('input2').value);
  rows = parseInt(document.getElementById('input1').value);
  mines = parseInt(document.getElementById('input3').value);
}

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

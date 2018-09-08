/** ------------Global variables ------------ */

let grid;
let cols=0;
let rows=0;
let mines=0;
let width = 30;
let arrMines;

/** ------------ P5 interface ------------ */
/** Creates a canvas with a 2D array according to the input*/
function setup() {

    /** Gets the dimensions from the user */
    rows = document.getElementById("input1").value;
    cols = document.getElementById("input2").value;
    mines = document.getElementById("input3").value;

    if(rows<2){
        rows=2;
    }
    if(cols<2){
        cols=2;
    }
    if(mines<=0){
        mines=1;
    }
    if(mines>=rows*cols){
        mines=rows*cols-1;
    }

    createCanvas(cols*width +1, rows*width +1);

    /** Creates a 2D Array with the cols and rows given*/
    grid = create2DArray(cols, rows);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[c][r] = new Box(c*width, r*width, width);
      }
    }

    /** Populates the grid with the amount of mines given */
    mine_population(mines, rows, cols, grid);
}


/** Draws the canvas on the site */
function draw() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

/** ------------ HELPER FUNCTIONS ------------ */

/** Creates a 2D Array */
function create2DArray(cols,rows){
  let grid = new Array(cols);
  for (let c=0; c<cols; c++){
    grid[c] = new Array(rows);
  }
  return grid;
}


/** Test function to change the box if it is clicked */
function mouseClicked(){
    let x;
    let y;
    x = floor(mouseX/width);
    y = floor(mouseY/width);
    grid[x][y].clicked=true;
    //* Need to check what is the status of the box. Right now just puts a circle on each box that is clicked */
}

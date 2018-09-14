/**
 *  @fileOverview Interface of Minesweeper
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */

/** ------------Global variables ------------ */

let grid;
let cols=0;
let rows=0;
let mines=0;
let width = 30;
let flags = 0;

/** ------------ P5 interface ------------ */
/** Creates a canvas with a 2D array according to the input*/
function setup() {
    let r=0;
    let c=0;

    /** Gets the dimensions from the user */
    rows = floor(document.getElementById("input1").value);
    cols = floor(document.getElementById("input2").value);
    mines = floor(document.getElementById("input3").value);

    if (rows<2){
        rows=2;
    }
    if (cols < 2){
        cols = 2;
    }
    if (rows > 30){
        rows = 30;
    }
    if (cols > 30){
        cols = 30;
    }

    if(mines<=0){
        mines=1;
    }
    if(mines>=rows*cols){
        mines=rows*cols-1;
    }

    flags = mines;

    let canvas = createCanvas(cols*width +1, rows*width +1);
    canvas.parent('canvas-holder');

    /** Creates a 2D Array with the cols and rows given*/
    grid = create2DArray(cols, rows);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[c][r] = new Box(c*width, r*width, width);
      }
    }

    /** Populates the grid with the amount of mines given */
    mine_population(mines, rows, cols, grid);

    /** Populates the count of the grid */
    generate_playing_field(mines, rows, cols, grid);

}


/** Draws the canvas on the site */
function draw() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

/** ------------ Helper Functions ------------ */

/** Creates a 2D Array */
function create2DArray(cols,rows){
  let grid = new Array(cols);
  for (let c=0; c<cols; c++){
    grid[c] = new Array(rows);
  }
  return grid;
}

/** Works the flags when f is released */
function keyReleased(){
        if (key === 'f'){
                let x;
                let y;
                x = floor(mouseX/width);
                y = floor(mouseY/width);
                if (grid[x][y].clicked==false){
                        if (grid[x][y].flagged==true){
                                grid[x][y].flagged=false;
                                flags = flags + 1;
                        }
                        else if (flags > 0){
                                grid[x][y].flagged=true;
                                flags = flags - 1;
                        }
                }
                document.getElementById("flagsLeft").innerHTML = ("Remaining flags: " + flags);

                if(win(cols, rows, grid, mines)){
                    window.alert("You won!");
                    location = location;
                }
        }
}


/**
 * Changes the box implementation when if its clicked
 */
function mouseClicked(){
    let x;
    let y;
    x = floor(mouseX/width);
    y = floor(mouseY/width);
    if (grid[x][y].flagged==false){
      grid[x][y].clicked=true;
      /** Generates spaces if person clicks on box with count=0 and not a mine*/
      if (grid[x][y].count==0 && grid[x][y].mine==false){
          reveal_spaces(x,y,cols,rows,grid);
      }
      if(win(cols, rows, grid, mines)){
          window.alert("You won!");
          window.location.reload(true);
      }
      if(grid[x][y].mine == true){
        lose();
      }
    }
}

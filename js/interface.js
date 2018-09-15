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
let width=30;
let flags=0;

/** ------------ P5 interface ------------ */
/** Creates a canvas with a 2D array according to the input
    * @pre need a valid number of rows and columns to build the board
    * @post the board has been created and filled with mines, the user
    *      can now play the game!
          */
function setup() {
    /** Gets the dimensions from the user */
    rows = floor(document.getElementById("input1").value);
    cols = floor(document.getElementById("input2").value);
    mines = floor(document.getElementById("input3").value);
    flags = mines;

    /** Boundaries for the grid */
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
        flags=1;
    }
    if(mines>=rows*cols){
        mines=rows*cols-1;
        flags=mines;
    }

    /** Creates a canvas that holds the amount of cols and rows given according to the set width*/
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

    /** Populates the count of each box in the grid */
    generate_playing_field(mines, rows, cols, grid);

}

/** Draws the canvas on the site
    * @pre there has been a 2d array built, but it has nothing inside it
    * @post the array is now filled with mines or number of adjacent mines
    * @return none
    */
function draw() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid[c][r].show();
    }
  }
}

/** ------------ Helper Functions ------------ */

/**
 * Creates a 2D Array according to the cols and rows given
 * @param   {number} cols number of columns for the 2D array
 * @param   {number} rows number of rows for the 2D array
 * @return  {array} 2D array with the the numbers of cols and rows
 */
function create2DArray(cols,rows){
  let grid = new Array(cols);
  for (let c=0; c<cols; c++){
    grid[c] = new Array(rows);
  }
  return grid;
}


/** Works the flags when f is released
  * @pre An array has been created and filled with box objects, some of which contain mines
  * @post Once the f key has been released a flag will be set wherever the cursor hovered when f is pressed
  *       (decrementing flagCount by 1) if this is repeated, the flag will be removed and flagCount will increase by 1
  *  @return none
*/
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
 * Changes the box implementation when it is clicked  the number of mines adjacent to that spot will appear. If they have flagged every
 * mine, they win
 *
 * @pre The board has been created and filled with mines, the user is playing
 * @post if the user clicks a mine, they lose. If they click anything other than a mine,
 * @return none
 */
function mouseClicked(){
    /** Gets coordinate of the click input */
    let x = floor(mouseX/width);
    let y = floor(mouseY/width);
    /** If the box does not have a flag, change the boxs implementation */
    if (grid[x][y].flagged==false){
      grid[x][y].clicked=true;
      /** Generates spaces if the box is an space and not a mine*/
      if (grid[x][y].count==0 && grid[x][y].mine==false){
          reveal_spaces(x,y,cols,rows,grid);
      }
      /** Calls win function */
      if(win(cols, rows, grid, mines)){
          window.alert("You won!");
          window.location.reload(true);
      }
      /** Calls lose function */
      if(grid[x][y].mine == true){
        lose();
      }
    }
}

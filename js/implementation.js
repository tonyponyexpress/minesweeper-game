/**
 *  @fileOverview Implementation of Minesweeper
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */


/**this takes an x value, an array, and the current number of elements in that array.
It checks (for the number of elements currently in the array) whether or not the value
is already in the array. If it is then it returns false, if it is not it returns true.
	* @param {number} value - Value that is interpreted as a mine
	* @param {array} arr - the grid of the game
	* @param {number} currentLength - size of the grid
	* @return {boolean} unique - if value is in array, return true
	* @pre: need a valid value, array, and array length
	* @post: checks to see if value is in array
	*/

function unique_func(value, arr, currentLength){
	let unique = true;
	for(let i=0; i<currentLength; i++){
		if(value == arr[i]){
			unique = false;
		}
	}
	return unique;
}

/**this first creates an array of unique random numbers less than the floor of rows*cols
when isFull=true the array of mine locations is full, its time to put them in!
The triple nested for-loop places all the mines in place. We chose to use a "9"
to represent a 9 because all spaces around it =1 plus it is a mine so 8+1=9
 * @param {number} number - number of mines
 * @param {number} rows - number of rows
 * @param {number} cols - number of cols
 * @param {array} multi_array - the grid of the game
 * @pre: need valid number of mines, rows, cols, and a grid
 * @post: populates mines on the grid
 */
function mine_population(number, rows, cols, multi_array){
	let mine_locations = new Array(number); /**creates empty array the size of the number of mines the user picked*/
	let isfull = false; /**this will keep track of when the mine_locations array is full (currently empty)*/
	let mineCount=1; /**this needs to start at 1 so that unique_func can run the first time*/
	let i=0;
	while(!isfull){ /**only run until the mine_locations array is full*/
		let x=Math.floor(Math.random() * (rows*cols)); /**this creates a random int between 0 and rows*cols then takes the floor*/

		if(unique_func(x, mine_locations, mineCount)){ /**if unique, run below code*/
			mine_locations[i] = x; /**place this x value in mine_locations*/
			mineCount++; /**increment the number of mines that have been placed*/
			i++;
			if(mineCount-1 == number){ /**-1 accounts for starting at 1*/
				isfull = true; /**array is full, you can break out and put them in now*/
			}
		}
	}
	for(let i=0; i<number; i++){ /**for the number of mines they would like to place*/
		let y = mine_locations[i] % (cols);
		let x = (mine_locations[i] - y) / (cols);
		multi_array[y][x].mine=true;
	}
}

/** checks to see if a given index of a 2d array is within that array's bounds
	* @param {number} a - bound variable for the rows of grid
	* @param {number} b - bound variable for the of grid
	* @param {number} cols - number of cols
	* @param {number} rows - number of rows
	* @return {boolean} - if in bounds, return true
	* @pre: need valid rows, cols, and bounds
	* @post: nothing
	*/
function is_within_bounds(a, b, cols, rows){
	if((a >= 0) && (b >= 0) && (a < cols) && (b < rows)){
		return true;
	}
	else{
		return false;
	}
}



/** Adds adjacent numbers to the playing grid
	* @param {number} number_of_mines - the number of mines
	* @param {number} rows - number of rows
	* @param {number} cols - number of cols
	* @param {array} multi_array - the grid of the game
	* @pre: need valid mines, rows, cols, and grid
	* @post: places numbers on the grid that are adjacent to mines
	*/
function generate_playing_field(number_of_mines, rows, cols, multi_array){
	/**these two for loops traverse through every index of the array */
	for (let c = 0; c < cols; c++) {
	  for (let r = 0; r < rows; r++) {
			let count=0;
			if(multi_array[c][r].mine != true){
				/** these two for loops check all surrounding indices of the current index in the array */
				for(let a = -1; a <= 1; a++){
					for(let b = -1; b <= 1; b++){
						let column_test = c + a;
						let row_test = r + b;
						if(is_within_bounds((column_test),(row_test),cols,rows)){
							if(multi_array[c+a][r+b].mine == true){
								count = count +1;
							}
						}
					}
				}
			}
			/** assigns the number of adjacent mines to the current index*/
			multi_array[c][r].count = count;
	  }
	}


	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			console.log(multi_array[i][j]);
		}
	}
}

/**
 * Reveals boxes around grid [y,x] that are spaces, and for each space has a recursive call to reveal its spaces
 * @param   {number} y column coordinate of the space
 * @param   {number} x row coordinate of the space
 * @param   {number} cols number of columns on the grid
 * @param   {number} rows number of rows on the grid
 * @param   {Array} multi_array grid
 * @pre: need valid cols, rows, multi_array, and grid coordinates
 * @post: recursively reveals spaces
 */
function reveal_spaces(y, x, cols, rows, multi_array){
	/** Nested for loop to access the boxes around grid[y][x] */
	for(let a = y-1; a <= y+1; a++){
		for(let b = x-1; b <= x+1; b++){
			if(is_within_bounds(a,b,cols,rows)){
				/** click the boxes that have count=0, haven't been cliked and are not a mine or flag */
				if(multi_array[a][b].count == 0 && grid[a][b].clicked==false && multi_array[a][b].mine == false && multi_array[a][b].flagged == false){
					multi_array[a][b].clicked = true;
					/** recursive call to reveal spaces of the new count=0 box */
					reveal_spaces(a,b,cols,rows,multi_array);
				}

				/** reach a number boundarie, if it is not a bomb or flag click the box */
				else if (multi_array[a][b].mine==false && multi_array[a][b].count>0 && multi_array[a][b].flagged == false){
					multi_array[a][b].clicked = true;
				}
			}
		}
	}

}

/** Let's user know that the game is finished and resets the game
	* @param {number} cols - number of columns
	* @param {number} rows - number of rows
	* @param {array} multi_array - grid of the game
	* @param {number} flags - number of flags on the grid
	* @return {boolean} - true if the user wins
	* @pre: need valid rows, cols, grid, and flags
	* @post: allows another method to indicate if the user won
	*/
function win(cols, rows, multi_array, flags){
	let count = 0;
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			if(multi_array[i][j].flagged == true && multi_array[i][j].mine == true){
				count += 1;
			}
		}
	}

	if(count == flags){
		return true;
	}
	else{
		return false;
	}
}

/** Let's user know that the game is lost and resets the game
	* @param {none}
	* @pre: user has to lose the game
	* @post: alerts user that the game is over
	*/
function lose(){
	window.alert("You lose!");
	document.location.reload(true);
}

/**this takes an x value, an array, and the current number of elements in that array.
It checks (for the number of elements currently in the array) whether or not the value
is already in the array. If it is then it returns false, if it is not it returns true.*/
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
to represent a 9 because all spaces around it =1 plus it is a mine so 8+1=9*/
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
		let x = (mine_locations[i] - y) / (rows);
		multi_array[x][y] = 9; /**set that location equal to 9*/
	}
	/**for(let x=0; x<rows; x++){ this is a test function to make sure population works
		for(let y=0; y<cols; y++){
			if(multi_array[x][y]==9){
				console.log("M");
			}
			else {
				console.log("0");
			}
		}
	}
	*/
}

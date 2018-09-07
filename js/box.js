/**
 *
 * @constructor
*/

function Box(x,y,width)
{
  this.x = x;
  this.y = y;
  this.w = width;
  this.bomb = false;
}

Box.prototype.show = function() {
  rect(this.x, this.y, this.w, this.w);
}

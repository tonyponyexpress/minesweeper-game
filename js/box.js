/**
 *
 * @constructor
*/

function Box(x,y,width)
{
  this.x = x;
  this.y = y;
  this.w = width;
}

Box.prototype.show = function() {
  rect(this.x, this.y, this.w, this.w);
}

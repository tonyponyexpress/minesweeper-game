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
    fill(140, 179, 217);
    rect(this.x, this.y, this.w, this.w);
}

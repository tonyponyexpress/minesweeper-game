/**
 *
 * @constructor
*/

function Box(x,y,width)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.mine = false;
    this.clicked = false;
    this.count = 0;
}

Box.prototype.show = function() {
    fill(140, 179, 217);
    rect(this.x, this.y, this.w, this.w);
    if (this.clicked){
        if(this.count==0){
            // red
            fill(179, 0, 0);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==1){
            // green
            fill(102, 255, 51);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==2){
            // pink
            fill(204, 0, 153);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else{
            // yellow
            fill(255, 255, 0);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
    }

}

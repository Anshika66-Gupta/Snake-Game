function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    score = 0;

    snake = {
        length:5,
        color:"red",
        cells: [],
        direction:"right",
        createSnake:function(){
            for(var i=this.length-1;i>=0;i--){
                this.cells.push( {x:i,y:0});
            }
        },
        drawSnake:function(){
            this.cells.forEach(function(cell){
                pen.fillStyle = snake.color;
                pen.strokeStyle = "white";
                pen.lineWidth = 5;
                pen.strokeRect(cell.x*20,cell.y*20,20,20);
                pen.fillRect(cell.x*20,cell.y*20,20,20);
            });
        },
        updateSnake:function(){



            var newX = this.cells[0].x;
            var newY = this.cells[0].y;

            if(newX==particle.x &&newY==particle.y){
                particle = generateParticle();
                score++;
            }
            else{
                var lastCell = this.cells.pop();
            }


            if(this.direction=="right"){
                newX++;
            }
            else if(this.direction=="left"){
                newX--;
            }
            else if(this.direction=="up"){
                newY--;
            }
            else if(this.direction=="down"){
                newY++;
            }
            this.cells.unshift({x:newX,y:newY});

        },

    };
    snake.createSnake();

    function changeDir(e){
        if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowUp"){
            snake.direction = "up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }


    }

    ///Listner for Keyboard Inputs
    document.addEventListener('keydown',changeDir);

    particle = generateParticle();

}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = "blue"; pen.fillRect(particle.x*20,particle.y*20,20,20);
    pen.font = "30px Arial";
    pen.fillText("Score "+score,10,70);




}
function generateParticle(){
    var x = Math.round(Math.random()*(W - 20)/20);
    var y = Math.round(Math.random()*(H-20)/20);
    console.log(x+" ," +y);
    return {x:x,y:y};
}
function update(){
    snake.updateSnake();
}
function render(){
    draw();
    update();
    console.log("In render");
}
init();
setInterval(render,60);

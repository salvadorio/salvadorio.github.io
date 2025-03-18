

class Machine {
    constructor(x, y, dir) {

        this.subdiv = 4;
        let usersub = document.getElementById("sides").value;

        this.subdiv = usersub
        this.size = 200;
        this.x = x
        this.y = y
        this.audio = new Audio('drum.wav');
        this.triggers = []
        for (let i = 0; i < 1000; i+= 1000/this.subdiv) {
            this.triggers.push(Math.floor(i))
        }
        console.log(this.triggers)
    }


    update(ctx, dir) {

        ctx.fillStyle = "rgb(0 0 0)";

        
        let tempDir = dir/1000 * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo( this.x + (this.size/10 * Math.cos(tempDir)), this.y+ (this.size/10 * Math.sin(tempDir)))
        for (let i = 0; i < this.subdiv; i++) {
            tempDir += (Math.PI ) / this.subdiv
            ctx.lineTo( this.x + (this.size * Math.cos(tempDir)), this.y + (this.size * Math.sin(tempDir)))
            tempDir += (Math.PI ) / this.subdiv
            ctx.lineTo( this.x + (this.size/10 * Math.cos(tempDir)), this.y + (this.size/10 * Math.sin(tempDir)))
        }

        if (this.triggers.includes(dir)) {
            console.log("pop")
            this.audio.play();
        }

        ctx.fill();
        
    }
}

class Party {
    constructor() {
        this.dir = 0
        this.container = document.createElement("div")
        this.container.className = "rhy"
        this.canvas = document.createElement("canvas")
        this.canvas.style.border = "1px solid";
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = window.innerHeight * 0.8;;


        house.appendChild(this.container)
        this.container.appendChild(this.canvas)

        this.machines = []
        this.ctx = this.canvas.getContext("2d");

    }
    update() {
        this.dir = (this.dir + 1) % 1000
        this.ctx.fillStyle = "rgb(245 250 255)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let machine of this.machines) {
            
            machine.update(this.ctx, this.dir);
            
        }

        

    }
    newMachine() {
        this.machines.push(new Machine(Math.random() * this.canvas.width, Math.random() * this.canvas.height))
    }
}

let machines = []
let party;

function init() {
    
    party = new Party();

}   

function newMachine() {
    
    party.newMachine();
}

function frame() {
    party.update();

    requestAnimationFrame(frame);
}

init()

requestAnimationFrame(frame);
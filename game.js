function toggleFlex() {
    var dir = document.getElementById("flex-direction-select"); 
    var just = document.getElementById("justify-content-select"); 

    var board = document.getElementById("board");

    board.style.flexDirection = dir.options[dir.selectedIndex].text;
    board.style.justifyContent = just.options[just.selectedIndex].text;

    console.log(dir.options[dir.selectedIndex].text);
    
}



let cx = 40
let cy = 40


vx = 0.3
vy = 0.2
let start;

function step() {

    // Math.min() is used here to make sure the element stops at exactly 200px

    let element = document.getElementById("car");
    element.style.top = String(cx) + "%"
    element.style.left = String(cy) + "%"

    cx += vx;
    cy += vy;

    if (cx < 0 || cx > 92) {
        vx *= -1;
    }

    if (cy < 0 || cy > 87) {
        vy *= -1;
    }
    


    requestAnimationFrame(step);
    
}

requestAnimationFrame(step);
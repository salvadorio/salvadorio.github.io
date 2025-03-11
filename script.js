const quotes = [
    "shadow wizard money gang\nwe love casting spells\ngoblins will see you teleport and say \"he can't afford a steed\"" ,
    "the Sorcerer has harmed me once more" ,
    "the torture sphere has a certain\n'je ne sais quoi",
    "perhaps i was right in a new and unusual way",
    "drum with designs of concentric circles and frogs in high relief",
    "we ramble on\nand on\nand on\nand off",
    "dopamine vs. seratonin\nbattle to the death",
    "fifty years ago\nif you wanted to see \na picture of a raccoon\nyou either had to already have it\nor drive to the library\nand a raccoon in a funny hat?\nforget about it.",    
    "sal to ever do it",
    "let me tell you my Theories",
    "sorry for being a little boring",
    "dont worry\ndont compare\ndont expect too fast\nbe kind to yourself",
    "commerce and whimsy",
    "use an out of body experience \nto be more judgemental to yourself",
    "if you see anything interesting\nplease let someone know immediately!",
    "coherent literary analysis",
    "everybody in the club get earnest",
    "then i realized something\ni was keeping\nmy old wounds fresh\nand open, as evidence\nfor a trial\nthat would never come\n\n-mark nepo",
    "i can't keep track of all my socks\nim irresponsible not because im a rockstar\nyou can call me what you want\ni think id like to hear you talk",
    "i think life is a game\nim just playing along\ni had something to say\nthen forgot what it was",
    "if you were here for the other night you'd be terrified\nyou know i think the lions your afraid of are all made up\nnobody's gonna regret this for you\nif it don't make you smile",
    "i'll be gone like summer\ni'll be here like rain\nfar beyond my expertise",
    "you got room in your phone\nfor one more distraction?",
    "only thing that keep me out of my head when i'm in bed\nare the photos on the wall back when we had it all\nso i been tryna keep track of it\ncatch it and it vanish like a magic trick",
    "forgive me for\nforgive me for what?",
    "late as usual\ngot a lot going on and on",
    "you would do it too cause you're just like us\ndon't you play the role and dissapoint all of these people who adore you",
    "two million miles a minute\nheaded for certain destruction",
    "the higher-ups will tell you what you can't eat\nwhere you can't go\nhow to dress\nhow to act decent",
    "cause when nobody's home\ni'm the king of everything\nmake the rules up on my own\ni can break em if i please\ncause i make up the police",
    "how many warning signs til it hits you darling\ngravity's your friend\nfall out of touch sometime\nbut your history calls you back to it again",
    "it's as hard as it looks, sometimes\nthat's as far as it gets sometimes"]

/* https://stackoverflow.com/questions/53051359/javascript-random-quote-generator-how-to-have-quote-appear-as-page-first-loads */
/* https://stackoverflow.com/questions/6840326/how-can-i-create-and-style-a-div-using-javascript */


class hoverableImage {
    constructor(imgFile, imgText = "", hyperlink = ""){
        this.imgFile = imgFile
        if (imgText == "") {
            this.imgText = imgFile.split("/")[2].split(".")[0]
        } else {
            this.imgText = imgText
        }
        
        
        this.hyperlink = hyperlink
    }

    render(parent) {
        var container = document.createElement("div")
        container.className = "container"
    
        var hyperlink = document.createElement("a")
        hyperlink.href = this.hyperlink
        
        var img = document.createElement("img");
        img.src = this.imgFile

        var overlay = document.createElement("div")
        var text = document.createElement("div")
        text.className = "faderText"
        var str = this.imgText
        text.textContent = str
        overlay.className = "overlay"
        img.style.margin = "5px"
        
        parent.appendChild(container)
        container.appendChild(hyperlink)
        hyperlink.appendChild(img)
        hyperlink.appendChild(overlay)
        overlay.appendChild(text)
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

function forFunProjects(){
    var arr = ['blenderwallpaper.png', 'visualmusicmixer.png', 'goghembroidery.png','guitar.png', "midi.png"];
    var descriptions = ["i made a wallpaper for my computer in blender with clickable sign app icons",
        "i wrote this program to record, mix, and edit together a bunch of recordings of me playing music",
        "i wrote some code to analyze brush strokes of Starry Night and output embroidery machine code",
        "i built a guitar at my local makerspace, with resin and wisteria flowers in the cavities",
        "i made a midi controller with arduino to talk to my chase bliss mood mkii"
    ]
    
    var blender = new hoverableImage('imgs/projectPreviewImg/blenderwallpaper.png',"i made a wallpaper for my computer in blender with clickable sign app icons")
    var mixer = new hoverableImage('imgs/projectPreviewImg/visualmusicmixer.png', "i wrote this program to record, mix, and edit together a bunch of recordings of me playing music", "https://www.youtube.com/watch?v=0yt8WVD2njI")
    var emb = new hoverableImage('imgs/projectPreviewImg/goghembroidery.png', "i wrote some code to analyze brush strokes of Starry Night and output embroidery machine code")
    var guitar = new hoverableImage('imgs/projectPreviewImg/guitar.png',"i built a guitar at my local makerspace, with resin and wisteria flowers in the cavities" )
    var midi = new hoverableImage('imgs/projectPreviewImg/midi.png', "i made a midi controller with arduino to talk to my chase bliss mood mkii")
    
    var src = document.getElementById("jank")


    // whole width
    mixer.render(src);
    blender.render(src);

    var halfsies = [emb, guitar, midi];

    //shuffle(halfsies)

    for (let i = 0; i < halfsies.length; i++) {
        var src=document.getElementById("forfun" + String(i%2))
        halfsies[i].render(src)
    }

}

function forClassProjects(){
    var arr = ['synth.png', 'rpsrect.png', 'projection.png', 'wall-drawing.png'];
    var descriptions = ["i made this tool where you can add modify synthesizers that all follow a global tempo, key, and chord structure",
        "i designed a rock-paper-scissors app in Figma",
        "Sam and i played with projection mapping using openCV to create feedback loops from user input",
        "used p5js to generate Sol Lewitt's wall drawing 65"
    ]

    var schoolProjects = [];

    for (let i = 0; i < arr.length; i++) {
        schoolProjects.push(new hoverableImage("imgs/classwork/"+arr[i], descriptions[i], (arr[i].split(".")[0] + ".html")))
    }


    shuffle(schoolProjects);
    for (let i = 0; i < schoolProjects.length; i++) {
        var src=document.getElementById("forclass" + String(i%2))
        schoolProjects[i].render(src)
    }
    
}

function randomImage() {
    var imagesArray = ['triceps.png', 'themet.png', 'band.png', 'rocksie.png', 'sleepydog.png', 'prom.png', '3dprinting.png', 'guitarshop.png', 'pantssewn.png', 'screenshot.png', 'mirrorpic.png', 'sleepy.png', 'beach.png', 'rocksieface.png', 'haloween.png', 'omurice.png', 'riley.png', 'nature.png', 'portugalguitar.png', 'newyork.png', 'profile.png', 'youngsalvadordemeanor.png', 'doglap.png', 'guitar.png', 'running.png', 'studyhall.png', 'barbie_outfit.png', 'kindergarten.png', 'ohno.png', 'formaldrip.png']
    
    var imgs = [];

    for (let i = 0; i < imagesArray.length; i++) {
        imgs.push(new hoverableImage("imgs/ofme/"+imagesArray[i]))
    }
    shuffle(imgs);

    for (let i = 0; i < 3; i++) {
        var div = document.createElement("div");
        div.id = "imageCol" + i
        div.style.flexDirection = "column"
        div.style.margin = "5px"
        var src=document.getElementById("aboutMeImages")
        src.appendChild(div)
    }

    for (let i = 0; i < 12; i++) {
        var src=document.getElementById("imageCol"+String(i%3))
        imgs[i].render(src)
    }

}



function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('randq').innerHTML = quotes[randomNumber] + "\n";
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.getElementById("stickyhead").style.height = "20vh";
        document.getElementById("stickyhead").style.paddingTop = "4px"

    } else {
        document.getElementById("stickyhead").style.height = "40vh";
        document.getElementById("stickyhead").style.paddingTop = "15px";

    }
} 


newQuote()
randomImage()
forFunProjects()
forClassProjects()
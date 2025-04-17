
let handPose;
let video;
let hands = [];
let synth;
let voices = {};
const minFreq = 220;
const maxFreq = 880;


function preload() {
    // Load the handPose model
    handPose = ml5.handPose();
}


function setup() {
    createCanvas(640, 480);
    // Create the webcam video and hide it
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    // start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);
}
  
function draw() {
    let active = Object.keys(voices).length;
    // Draw the webcam video
    image(video, 0, 0, width, height);
    let tips = []
    // Draw all the tracked hand points
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];

      for (let j = 0; j < hand.keypoints.length; j++) {
        let keypoint = hand.keypoints[j];
        if (keypoint.name.includes("tip")){
            tips.push([keypoint.x, keypoint.y, keypoint.name])
            fill(255, 0, 0);
            noStroke();
        } else{

            fill(0, 255, 0);
            noStroke();
        }
        
        
        circle(keypoint.x, keypoint.y, 10);
      }
    }
    for(let i = 0; i < tips.length; i++){
        for(let j = i+1; j < tips.length; j++){
            stroke(155, 155, 255);
            strokeWeight(5);
            line(tips[i][0], tips[i][1], tips[j][0], tips[j][1]);
            
        }
    }


    for (let i = 0; i < tips.length; i++) {
        for (let j = i + 1; j < tips.length; j++) {
          let [x1, y1, n1] = tips[i];
          let [x2, y2, n2] = tips[j];
          if (n1 === n2) continue;
          // Create sorted key for pair
          let key = [n1, n2].sort().join('-');

    
          // Distance and mapped frequency
          let d = dist(x1, y1, x2, y2);
          let maxD = dist(0, 0, width, height);
          let freq = map(d, 0, maxD, minFreq, maxFreq);
    

          if (!voices[key]) {
            let osc = new p5.Oscillator('sine');
            osc.freq(freq);
            let env = new p5.Envelope();
            env.setADSR(0.05, 0.1, 0.5, 0.5);
            env.setRange(0.6, 0);
            osc.amp(env);
            osc.start();
            env.play();
            voices[key] = { osc, env };
          } else {
            // Update existing voice frequency smoothly
            voices[key].osc.freq(freq, 0.1);
          }
        }
      }
    
      // Stop voices for pairs no longer active
      for (let key in voices) {

          let { osc, env } = voices[key];
          env.triggerRelease();
          // Remove after envelope completes
          setTimeout(() => {
            osc.stop();
            delete voices[key];
          }, 600);
        
      }
    
}
  
  // Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
}
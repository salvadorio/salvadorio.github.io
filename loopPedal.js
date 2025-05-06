

class Metronome
{
    constructor(tempo = 120)
    {
        this.audioContext = null;
        this.notesInQueue = [];         // notes that have been put into the web audio and may or may not have been played yet {note, time}
        this.currentBeatInBar = 0;
        this.beatsPerBar = 4;
        this.tempo = tempo;
        this.lookahead = 25;          // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0;     // when the next note is due
        this.isRunning = false;
        this.intervalID = null;
    }

    nextNote()
    {

        var secondsPerBeat = 60.0 / this.tempo; 
        this.nextNoteTime += secondsPerBeat; 
    
        this.currentBeatInBar++;  
        if (this.currentBeatInBar == this.beatsPerBar) {
            this.currentBeatInBar = 0;
        }
    }

    scheduleNote(beatNumber, time)
    {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time });
    
        // create an oscillator
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();
        
        osc.frequency.value = (beatNumber % this.beatsPerBar == 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);
    
        osc.start(time);
        osc.stop(time + 0.03);
        if (beatNumber % this.beatsPerBar == 0){
            for (let i = 0; i < loops.length; i++) {
                loops[i].play(time)
            }
        }
    }   

    scheduler()
    {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
            this.scheduleNote(this.currentBeatInBar, this.nextNoteTime);
            this.nextNote();
        }
    }

    start()
    {
        if (this.isRunning) return;

        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.isRunning = true;

        this.currentBeatInBar = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;

        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    stop()
    {
        this.isRunning = false;

        clearInterval(this.intervalID);
    }

    startStop()
    {
        if (this.isRunning) {
            this.stop();
            var img = document.getElementById("ppimg")
            img.src = "imgs/playpause-02.svg"
        }
        else {
            this.start();
            var img = document.getElementById("ppimg")
            img.src = "imgs/playpause-01.svg"
        }
    }
}


var loops = []

var video = document.getElementById("video");

var stream;
navigator.mediaDevices.getUserMedia({ video: true, audio: true})
.then(localMediaStream => {
    console.log(localMediaStream);
    video.srcObject = new MediaStream(localMediaStream.getVideoTracks());
    stream = localMediaStream
}).catch(err =>{
    console.error('oh why errors!!', err);
});


var metronome = new Metronome();


function playpause() {

    metronome.startStop();

}

function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
}


function record() {
    startRecording(((60.0/metronome.tempo)*1000.0) * metronome.beatsPerBar).then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        var loop = document.createElement('video')
        loop.src = URL.createObjectURL(recordedBlob);
        document.getElementById("loops").appendChild(loop)
        loops.push(loop)
    })
}
function startRecording(lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];
  
    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

  
    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });
  
    let recorded = wait(lengthInMS).then(() => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    });
  
    return Promise.all([stopped, recorded]).then(() => data);
  }
  
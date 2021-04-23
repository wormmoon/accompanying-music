// DRONE
let interval = 0;

class Drone {
  constructor() {
    this.gain = new Tone.Gain(0.1);
  }

  trigger() {
    let frequency = intervalToFrequency(349.23, interval, 0);
    var noise = new Tone.Noise("brown");
    var oscSine = new Tone.Oscillator(frequency, 'sine');
    var oscSaw = new Tone.Oscillator(frequency * 2, 'triangle');
    // gain
    var gainNoise = new Tone.Gain(0.2);
    var gainSine = new Tone.Gain(1);
    var gainSaw = new Tone.Gain(0.6);
    // chorus
    var chorus = new Tone.Chorus(2, 1.5, 0.75);
    // vibrato
    // const vibrato = new Tone.Vibrato();
    // filter
    var lowpassFilter = new Tone.Filter(1000, "lowpass");
    // reverb
    // var freeverb = new Tone.Reverb()
    // freeverb.dampening = 1000;
    // freeverb.wet.value = 0.5;
    // panner
    var panner = new Tone.Panner(0);

    oscSine.connect(gainSine);
    oscSaw.connect(gainSaw);
    noise.connect(gainNoise);
    gainNoise.connect(chorus);
    gainSine.connect(chorus);
    gainSaw.connect(chorus);
    chorus.connect(lowpassFilter);
    // freeverb.connect(lowpassFilter);
    lowpassFilter.connect(this.gain);
    this.gain.connect(panner);
    panner.connect(output);

    oscSine.start();
    oscSaw.start();
    noise.start();
    chorus.start();

    // gain
    this.gain.gain.rampTo(0.1, 1);
    // panner
    // repeated event every 8th note
    Tone.Transport.scheduleRepeat((time) => {
      const droneNow = Tone.context.currentTime;
      panner.pan.rampTo(-0.5, 1);
      panner.pan.rampTo(0.5, 2, droneNow + 1);
      panner.pan.rampTo(0, 1, droneNow + 3);
    }, "1n");
  }

  stop() {
    this.gain.gain.rampTo(0, 1);
  }
}

// const playBtn = document.querySelector('.js-play-btn');
// const drone = new Drone();

// let playing = false;
// let timer;


// playBtn.addEventListener('click', function() {
// 	// if (firstInteraction) {
// 	// 	audioInit();
// 	// }

//   if (playing === false) {
//     console.log(now);
//     // gain
// 		gain.gain.rampTo(0.1, 1);
//     // panner
//     // repeated event every 8th note
//     // Tone.Transport.scheduleRepeat((time) => {
//     //   panner.pan.rampTo(-1, 2);
//     //   panner.pan.rampTo(1, 4, time + 4);
//     //   panner.pan.rampTo(0, 2, time + 6);
//     // }, "8n");
    
//     // timer = setInterval(() => {
//     //   panner.pan.rampTo(-1, now + 3);
//     //   panner.pan.rampTo(1, now + 6);
//     //   panner.pan.rampTo(0, now + 3);
//     // }, 12000);

// 		playing = true;
// 	// if track is playing pause it
// 	} else if (playing === true) {
// 		// frequency = intervalToFrequency(220, interval, 1);
// 		// oscSaw.frequency.value = frequency * 2;
// 		// oscSine.frequency.value = frequency;
// 		gain.gain.rampTo(0, 1);
//     // clearInterval(timer);
// 		playing = false;
// 	}
// })
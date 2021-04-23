// DRONE
// let firstInteraction = true;
let interval = 0;
let now = Tone.context.currentTime;

class Drone {
  constructor() {
    this.gain = new Tone.Gain(0.1);
  }

  trigger() {
    let frequency = intervalToFrequency(349.23, interval, -1);
    var noise = new Tone.Noise("brown");
    const oscSine = new Tone.Oscillator(frequency, 'sine');
    const oscSaw = new Tone.Oscillator(frequency * 2, 'triangle');
    // gain
    const gainNoise = new Tone.Gain(0.2);
    const gainSine = new Tone.Gain(1);
    const gainSaw = new Tone.Gain(0.6);
    // chorus
    const chorus = new Tone.Chorus(2, 1.5, 0.75);
    // vibrato
    // const vibrato = new Tone.Vibrato();
    // filter
    var lowpassFilter = new Tone.Filter(1000, "lowpass");
    // reverb
    const freeverb = new Tone.Freeverb()
    freeverb.dampening = 1000;
    // panner
    // const panner = new Tone.Panner(0);

    oscSine.connect(gainSine);
    oscSaw.connect(gainSaw);
    noise.connect(gainNoise);
    gainNoise.connect(chorus);
    gainSine.connect(chorus);
    gainSaw.connect(chorus);
    chorus.connect(freeverb);
    freeverb.connect(lowpassFilter);
    lowpassFilter.connect(this.gain);
    // panner.connect(gain);
    this.gain.connect(output);

    oscSine.start();
    oscSaw.start();
    noise.start();
    chorus.start();

    // gain
    this.gain.gain.rampTo(0.1, 1);
  }

  stop() {
    this.gain.gain.rampTo(0, 1);
  }
}

// transport
// Tone.Transport.bpm.value = 54;

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
//     //   panner.pan.rampTo(-1, time + 2);
//     //   panner.pan.rampTo(1, time + 4);
//     //   panner.pan.rampTo(0, time + 2);
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
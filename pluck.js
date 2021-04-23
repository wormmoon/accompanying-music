// PLUCK
class Pluck {
  constructor() {
  }

  trigger(now, note) {
    // const interval = Math.round(Math.random() * 12);
    let frequency = intervalToFrequency(349.23, scale3[note], 1);
    var oscSine = new Tone.Oscillator(frequency, 'sine');
    var oscSaw = new Tone.Oscillator(frequency * 0.5, 'triangle');
    var lowpassFilter = new Tone.Filter(5000, "lowpass");
    lowpassFilter.Q.value = 2;
    lowpassFilter.frequency.rampTo(500, 1);
    // var peakingFilter = new Tone.Filter(300, "peaking");
    // peakingFilter.gain.value = 0.5;
    // vibrato
    var vibrato = new Tone.Vibrato();
    // const gainTriangle = new Tone.Gain(0.1);
    var gain = new Tone.Gain(0.01);
    gain.gain.rampTo(0.1, 0.8);
    gain.gain.rampTo(0, 0.2, now + 1);

    oscSine.connect(gain);
    oscSaw.connect(gain);
    oscSaw.connect(gain);
    gain.connect(lowpassFilter);
    // peakingFilter.connect(lowpassFilter);
    lowpassFilter.connect(vibrato);
    vibrato.connect(output);

    oscSine.start();
    oscSaw.start();
    oscSine.stop(now + 1.1);
    oscSaw.stop(now + 1.1);
  }
}

const scale = [0, 2, 5, 7, 9];
const scale2 = [-2, 0, 1, 4, 5];
const scale3 = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22];
// const output = Tone.context.destination;
// const pluck = new Pluck();

// const playBtn = document.querySelector('.js-play-btn');

// let timer;
// let playing = false;

// playBtn.addEventListener('click', function() {
//   if (playing === false) {
//     pluck.trigger();

//     timer = setInterval(() => {
//       if (percent(70)) {
//         pluck.trigger();
//       }
//     }, 400);
// 		playing = true;
// 	// if track is playing pause it
// 	} else if (playing === true) {
//     clearInterval(timer);
// 		playing = false;
// 	}

// 	// if (firstInteraction) {
// 	// 	audioInit();
// 	// }
// })

// function audioInit() {
// 	firstInteraction = false;
// };

// Pick random number from array
function pickRandomItem(array) {
  const arrayLength = array.length;
  const itemNumber = Math.floor(Math.random() * arrayLength);
  return array[itemNumber];
}

// Return true or false based on probablity perentage
function percent(probablity) {
  const number = Math.random() * 100;
  // Return true if number < probablity
  return number < probablity;
}
// PLUCK
class Pluck {
  construtor() {}

  trigger() {
    // const interval = Math.round(Math.random() * 12);
    let frequency = intervalToFrequency(220, pickRandomItem(scale2), 1);
    var oscSine = new Tone.Oscillator(frequency, 'sine');
    var oscSaw = new Tone.Oscillator(frequency * 0.5, 'square');
    var lowpassFilter = new Tone.Filter(10000, "lowpass");
    var now = Tone.context.currentTime;
    lowpassFilter.Q.value = 5;
    // lowpassFilter.frequency.rampTo(100, 1);
    var gain = new Tone.Gain(0);
    gain.gain.rampTo(0.1, 0.9);
    gain.gain.rampTo(0, 0.1, now + 0.9);

    oscSine.connect(gain);
    oscSaw.connect(gain);
    gain.connect(lowpassFilter);
    lowpassFilter.connect(output);

    oscSine.start();
    oscSaw.start();
  }
}

const scale = [0, 2, 5, 7, 9];
const scale2 = [-2, 0, 1, 4, 5];
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
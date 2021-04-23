// TONE JS
let firstInteraction = true;
let interval = 0;
let frequency = intervalToFrequency(220, interval, 1);
const oscSine = new Tone.Oscillator(frequency, 'sine');
const oscSaw = new Tone.Oscillator(frequency * 2, 'sawtooth');
// Output
const output = Tone.context.destination;
// gain
const gainSine = new Tone.Gain(1);
const gainSaw = new Tone.Gain(0.6);
const gain = new Tone.Gain(0);
// chorus
const chorus = new Tone.Chorus(2, 1.5, 0.75);

oscSine.connect(gainSine);
oscSaw.connect(gainSaw);
gainSine.connect(chorus);
gainSaw.connect(chorus);
chorus.connect(gain);
gain.connect(output);

const playBtn = document.querySelector('.js-play-btn');

let playing = false;
playBtn.addEventListener('click', function() {
	if (firstInteraction) {
		audioInit();
	}

  if (playing === false) {
		gain.gain.rampTo(0.1, 1);
		playing = true;
	// if track is playing pause it
	} else if (playing === true) {
		interval ++;
		frequency = intervalToFrequency(220, interval, 1);
		oscSaw.frequency.value = frequency * 2;
		oscSine.frequency.value = frequency;
		gain.gain.rampTo(0, 1);
		playing = false;
	}
})

function audioInit() {
	firstInteraction = false;
	oscSine.start();
	oscSaw.start();
	chorus.start();
};

// root = root frequency
// interval = how many piano keys up or down
// octave = how many octaves up or down from there
function intervalToFrequency(root, interval, octave) {
	let f = (root * (1 + (interval/12)));
	f = root * Math.pow(2, interval/12);
	f *= Math.pow(2, octave);
	return f;
}
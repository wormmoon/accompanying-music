// TONE JS
let firstInteraction = true;
var now = Tone.context.currentTime;
var output;

// transport
Tone.Transport.bpm.value = 60;

const playBtn = document.querySelector('.js-play-btn');
let playing = false;

// Drone
var drone = new Drone();
// Pluck
var pluck = new Pluck();
// repeated event every 8th note
// Tone.Transport.scheduleRepeat((time) => {
// 	const pluckNow = Tone.context.currentTime;
// 	pluck.trigger(pluckNow);
// }, "2n");

playBtn.addEventListener('click', function() {
	if (firstInteraction) {
		audioInit();
	}

  if (playing === false) {
		playing = true;
		// drone
		drone.trigger();
		Tone.Transport.start();
	// if track is playing pause it
	} else if (playing === true) {
		playing = false;
		drone.stop();
		Tone.Transport.stop();
	}
})

function audioInit() {
	Tone.start();
	firstInteraction = false;
	// Speakers
	const speakers = Tone.context.destination;
	// reverb
	var freeverb = new Tone.Freeverb();
	freeverb.dampening = 600;
	freeverb.connect(speakers);
	// Output
	output = freeverb;

	// Pluck
	Tone.Transport.scheduleRepeat((time) => {
		if (rgbaArray) {
			const note = pickNote(rgbaArray, scale3);
			// console.log('note', note);
			const pluckNow = Tone.context.currentTime;
			pluck.trigger(pluckNow, note);
		}
	}, "4n");
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
// TONE JS
let firstInteraction = true;
// Output
const output = Tone.context.destination;

const playBtn = document.querySelector('.js-play-btn');
let playing = false;

// Drone
const drone = new Drone();
// Pluck
const pluck = new Pluck();

playBtn.addEventListener('click', function() {
	// if (firstInteraction) {
	// 	audioInit();
	// }

  if (playing === false) {
		playing = true;
		drone.trigger();
	// if track is playing pause it
	} else if (playing === true) {
		playing = false;
		drone.stop();
	}
})

// function audioInit() {
// 	firstInteraction = false;
// };

// root = root frequency
// interval = how many piano keys up or down
// octave = how many octaves up or down from there
function intervalToFrequency(root, interval, octave) {
	let f = (root * (1 + (interval/12)));
	f = root * Math.pow(2, interval/12);
	f *= Math.pow(2, octave);
	return f;
}
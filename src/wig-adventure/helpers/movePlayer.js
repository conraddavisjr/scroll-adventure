// function for handling the environment movement when the player walks
var movePlayer = (scene, tween, elements, distance, timing, delay) => {

	// set the global walk distance for the scene passed in
	var walkDistance = `${scene}_walkDistance`
	// update the global walk distance for this scene
	window[walkDistance] = distance

	console.log('movePlayer CALLED')
	console.log('scene: ', scene, 'tween: ', tween, '-------> elements: ', elements, 'distance: ', distance, 'timing: ', timing)
	delay = delay ? delay : timing;
	tween.to(elements[0], timing, { x: `${distance}` }), `-=${delay}`
	tween.to(elements[1], timing, { x: `${distance / 2}` }, `-=${timing}`)
	tween.to(elements[2], timing, { x: `${distance / 4}` }, `-=${timing}`)

	return tween;
}

export default movePlayer;
// function for handling the environment movement when the player walks
var movePlayer = (tween, elements, direction, distance, timing) => {
	console.log('movePlayer CALLED')
	let dir = direction == 'left' ? '+=' : '-=';
	tween.to(elements[0], timing, { x: `${dir}${distance}` }), `-=${timing}`
	tween.to(elements[1], timing, { x: `${dir}${distance / 2}` }, `-=${timing}`)
	tween.to(elements[2], timing, { x: `${dir}${distance / 4}` }, `-=${timing}`)
}

export default movePlayer;
// Hopping player animation
var playerIdleHover = (paused, elements) => {
	console.log('playerIdleHover CALLED - paused: ', paused)
	// destructure the elements passed in
	const { 
	  playerBody,
	  playerIdleHoverTl 
	} = elements
	
	// if the the paused value is truthy, pause the playerIdleHoverTl and return the player to the ground, otherwise play the animation
	if (paused) {
		playerIdleHoverTl.set(playerBody, { y: 0 })
		playerIdleHoverTl.pause()
	} else {
		playerIdleHoverTl.play()
	} 
	playerIdleHoverTl.to(playerBody, 1, { y: "-=5", repeat: -1, yoyo:true, ease: Power1.easeInOut })
	return playerIdleHoverTl;
}

export default playerIdleHover;
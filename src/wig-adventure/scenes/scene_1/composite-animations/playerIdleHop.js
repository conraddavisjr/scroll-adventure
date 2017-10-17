// Hopping player animation
var playerIdleHop = (paused, elements) => {
	// destructure the elements passed in
	const { 
	  playerBody,
	  playerIdleHopTl 
	} = elements
	
	console.log('playerIdleHop CALLED')
	// if the the paused value is truthy, pause the playerIdleHopTl and return the player to the ground, otherwise play the animation
	if (paused) {
		playerIdleHopTl.set(playerBody, { y: 0 })
		playerIdleHopTl.pause()
	} else {
		playerIdleHopTl.play()
	} 
	playerIdleHopTl.to(playerBody, 0.3, { y: "-=30", repeat: -1, yoyo:true, ease: Power1.easeOut })
	return playerIdleHopTl;
}

export default playerIdleHop;
// build Scene One, section 1.1

import movePlayer from '../../../helpers/movePlayer';

var s1_1 = (elements) => {

	// init timeline for the subscene
	var s1_1 = new TimelineMax()

	// destructure the neccessary elements
	const {
		playerIdleHop,
		rowOneLandscape_S1,
		rowTwoLandscape_S1,
		rowThreeLandscape_S1
	} = elements

	// place scene Elements into an array to be passed to the movePlayer func
	var sceneElements = [
		rowOneLandscape_S1,
		rowTwoLandscape_S1, 
		rowThreeLandscape_S1
	]

	// stop the player from jumping and make them jump in reverse direction
	s1_1.call(() => playerIdleHop(false, elements))
	s1_1.call(() => playerIdleHop(true, elements))
	// playerIdleHopTl.pause()
	// simulate a double jump onto then off of the rock
	// 1st jump
	movePlayer(s1_1, sceneElements, 'right', 190, 0.5);
	s1_1.to(player, 0.3, { y: "-=250" }, "-=0.5")
	s1_1.to(player, 0.2, { y: "+=50" })
	// 2nd jump
	movePlayer(s1_1, sceneElements, 'right', 190, 0.5);
	s1_1.to(player, 0.3, { y: "-=50" }, "-=0.5")
	s1_1.to(player, 0.2, { y: 0 })
	s1_1.call(() => playerIdleHop(false, elements))

	return s1_1;
	
}

export default s1_1;
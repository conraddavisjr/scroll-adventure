// Scene One, section 1.1

import movePlayer from '../../../helpers/movePlayer';

var s1_1 = (elements) => {

	console.log('s1_1 CALLED')


	var s1_walkDistance = window.s1_walkDistance
	console.log('s1_walkDistance: ', s1_walkDistance)


	// destructure the neccessary elements
	const {
		playerIdleHover,
		rowOneLandscape_S1,
		rowTwoLandscape_S1,
		rowThreeLandscape_S1,
		playerIdleHoverTl,
		s1_1_Tl
	} = elements

	s1_1_Tl.pause()

	// place scene Elements into an array to be passed to the movePlayer func
	var sceneElements = [
		rowOneLandscape_S1,
		rowTwoLandscape_S1, 
		rowThreeLandscape_S1
	]

	// stop the player from jumping and make them jump in reverse direction
	s1_1_Tl.call(() => playerIdleHover(false, elements))
	s1_1_Tl.call(() => playerIdleHover(true, elements))
	// simulate a double jump onto then off of the rock
	// 1st jump
	s1_walkDistance = -645
	var timing = 0.5
	// s1_1_Tl.set(player, { x: 40, y: 0 })
	movePlayer('s1', s1_1_Tl, sceneElements, -645, 0.5);
	// s1_1_Tl.to(rowOneLandscape_S1, timing, { x: `${distance}` }, "-=0.5")
	// s1_1_Tl.to(rowTwoLandscape_S1, timing, { x: `${distance / 2}` }, "-=0.5")
	// s1_1_Tl.to(rowThreeLandscape_S1, timing, { x: `${distance / 4}` }, "-=0.5")
	s1_1_Tl.to(player, 0.3, { x: 40, y: -250 }, `-=${timing}`)
	s1_1_Tl.to(player, 0.2, { y: -205 })
	// 2nd jump
	// movePlayer(s1_1_Tl, sceneElements, 'right', 190, 0.5);
	var distance = -740
	timing = 0.5
	movePlayer('s1', s1_1_Tl, sceneElements, -740, 0.5);
	// s1_1_Tl.to(rowOneLandscape_S1, timing, { x: `${distance}` })
	// s1_1_Tl.to(rowTwoLandscape_S1, timing, { x: `${distance / 2}` }, "-=0.5")
	// s1_1_Tl.to(rowThreeLandscape_S1, timing, { x: `${distance / 4}` }, "-=0.5")
	s1_1_Tl.to(player, 0.3, { y: -230 }, "-=0.5")
	s1_1_Tl.to(player, 0.2, { x: 0, y: 0 })
	// s1_1_Tl.call(() => playerIdleHover(false, elements))

	return s1_1_Tl;
	
}

export default s1_1;
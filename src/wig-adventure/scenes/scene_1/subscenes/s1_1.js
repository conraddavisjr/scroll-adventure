// Scene One, section 1.1

import movePlayer from '../../../helpers/movePlayer';

var s1_1 = (elements, pageScrollPos) => {

	console.log('s1_1 CALLED')

	// destructure the neccessary elements
	const {
		playerIdleHover,
		rowOneLandscape_S1,
		rowTwoLandscape_S1,
		rowThreeLandscape_S1,
		playerIdleHoverTl,
		s1_1_Tl
	} = elements

	console.log('pageScrollPos on the S1.1 LEVEL: ', pageScrollPos)
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
	// movePlayer(s1_1_Tl, sceneElements, 'right', 150, 0.5);
	var distance = -540
	s1_1_Tl.to(rowOneLandscape_S1, 0.5, { x: `${distance}` }), "-=0.5"
	s1_1_Tl.to(rowTwoLandscape_S1, 0.5, { x: `${distance / 2}` }, "-=0.5")
	s1_1_Tl.to(rowThreeLandscape_S1, 0.5, { x: `${distance / 4}` }, "-=0.5")
	s1_1_Tl.to(player, 0.3, { x: 40, y: "-=250" }, "-=0.5")
	s1_1_Tl.to(player, 0.2, { y: "+=50" })
	// 2nd jump
	// movePlayer(s1_1_Tl, sceneElements, 'right', 190, 0.5);
	s1_1_Tl.to(player, 0.3, { y: "-=50" }, "-=0.5")
	s1_1_Tl.to(player, 0.2, { y: 0 })
	s1_1_Tl.call(() => playerIdleHover(false, elements))

	return s1_1_Tl;
	
}

export default s1_1;
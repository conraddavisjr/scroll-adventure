// Scene One, section 1.2

import movePlayer from '../../../helpers/movePlayer';

var s1_2 = (elements) => {

	// init timeline for the subscene
	var s1_2 = new TimelineMax()

	// destructure the neccessary elements
	const {
		playerBody,
		playerIdleHover,
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

	// make the player walk through the scene, up to the ledge
	// movePlayer(s1_2, sceneElements, 'right', 825, 20);
	var distance = -1655
	s1_2.to(rowOneLandscape_S1, 7, { x: `${distance}` })
	s1_2.to(rowTwoLandscape_S1, 7, { x: `${distance / 2}` }, "-=7")
	s1_2.to(rowThreeLandscape_S1, 7, { x: `${distance / 4}` }, "-=7")
	// make the player from bounce in reverse frame
	s1_2.call(() => playerIdleHover(true, elements), null, null)
	// stop the player from bouncing
	s1_2.call(() => playerIdleHover(true, elements), null, null)
	// tilt the player body downward
	s1_2.to(playerBody, 5, {transformOrigin: 'center center', rotation: '390cw', y: 0})
	// prolong the player's body looking downward
	s1_2.to(playerBody, 8, {transformOrigin: 'center center', rotation: '390cw', y: 0})
	// make the player bounce
	s1_2.call(() => playerIdleHover(false, elements), null, null)
	// make the player walk to the left
	// movePlayer(s1_2, sceneElements, 'left', 280, 6);
	distance = -1385
	s1_2.to(rowOneLandscape_S1, 3, { x: `${distance}` }), "-=3"
	s1_2.to(rowTwoLandscape_S1, 3, { x: `${distance / 2}` }, "-=3")
	s1_2.to(rowThreeLandscape_S1, 3, { x: `${distance / 4}` }, "-=3")
	// tilt the player body back to an upward walking position
	s1_2.to(playerBody, 1, {transformOrigin: 'center center', rotation: '360cw', y: 0}, "-=6")
	// prolong the player's positiong
	movePlayer(s1_2, sceneElements, 'left', 0, 5);
	// player runs and jumps over the cliff
	// run
	movePlayer(s1_2, sceneElements, 'right', 600, 5);
	// jump
	s1_2.to(player, 1, { y: "-=200" }, "-=4")
	// land
	s1_2.to(player, 1, { y: "+=50" }, "-=1.5")
	return s1_2;
	
}

export default s1_2;
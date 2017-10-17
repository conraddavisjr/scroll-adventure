// build Scene One, section 1.1

import movePlayer from '../../../helpers/movePlayer';

var s1_1 = (elements) => {

	console.log('s1_1 CALLED')

	// destructure the neccessary elements
	const {
		rowOneLandscape_S1,
		rowTwoLandscape_S1,
		rowThreeLandscape_S1
	} = elements

	var sceneElements = [
		rowOneLandscape_S1,
		rowTwoLandscape_S1, 
		rowThreeLandscape_S1
	]

	// init timeline for the subscene
	var s1_1 = new TimelineMax()
	// make the player move through the scene
	movePlayer(s1_1, sceneElements, 'right', 400, 1.5)

	return s1_1;
	
}

export default s1_1;
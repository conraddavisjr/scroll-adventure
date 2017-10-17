// build Scene One, section 1.1

import movePlayer from '../../../helpers/movePlayer';

var s1_2 = (elements) => {

	// init timeline for the subscene
	var s1_2 = new TimelineMax()

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

	// mke the player walk throught the scene, up to the ledge
	movePlayer(s1_2, sceneElements, 'right', 190, 1);

	return s1_2;
	
}

export default s1_2;
// Scene One, Section 1.0
// 

import movePlayer from '../../../helpers/movePlayer';

var s1_0 = (elements) => {

	// destructure the neccessary elements
	const {
		copyContainer,
		subCopyContainer,
		playerBody,
		phoneSpriteGroup,
		staggerPhoneSprites,
		overlay,
		playerIdleHop,
    flickeringPhonesTl,
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

	// init timline for the subscene
	var s1_0 = new TimelineMax()

	// set copy styles
	s1_0.set([copyContainer, subCopyContainer], { 
		css:{ 
			opacity: 0, 
			fontFamily: 'Roboto', 
			textAlign: 'center', 
			fontSize: '1.9em', 
			fontWeight: 'bold',
			color:"#DCDCF7", 
			width: '100%',
	    top: '200px'
		}, 
		text: { value: `Women <br> are gaming at <br> unprecedented <br> numbers. `}
	})
	// tilt the player to "look up"
	s1_0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '330ccw'})
	// fade the copy in
	s1_0.to(copyContainer, 5, {opacity: 1}, "+=0.7")
	// stagger the phone sprites into view and make them flicker
	s1_0.call(() => staggerPhoneSprites(elements))
	// fade out the copyContainer and the phone sprites
	s1_0.to([copyContainer, phoneSpriteGroup], 5, {opacity: 0}, "+=12")
	// make the phones flicker
	s1_0.call(() => flickeringPhonesTl.play(), null, null)
	// stop the phones from flickering
	s1_0.call(() => flickeringPhonesTl.pause(), null, null)
	// rotate the player to look up
	s1_0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '310ccw'})
	// update copy styles
	s1_0.set(copyContainer, { 
		css:{ 
			fontSize: '7em',
			top: '43px'
		}, 
		text: {value: `1%`}
	}, "+=0.5")

	var tcd = 0.5 //text count duration
	// count the text up to "65%""
	s1_0.to(copyContainer, 1, {opacity: 1}, "+=0.7")
	s1_0.to(copyContainer, tcd, {text: {value: `4%`}}, "+=0.7")
	s1_0.to(copyContainer, tcd, {text: {value: `9%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `12%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `18%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `20%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `24%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `28%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `30%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `31%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `35%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `37%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `39%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `42%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `44%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `45%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `47%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `49%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `54%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `57%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `61%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `62%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `65%`}})
	// slide the overlay up
	s1_0.to(overlay, `${tcd * 22}`, {y: '-60%'}, `-=${tcd * 22}`)
	s1_0.set(subCopyContainer, {
		text: {value: `of women ages 10-65 <br> play games.`},
		css:{
			top: '165px'
		},
	})
	// fade in the sub copy
	s1_0.to(subCopyContainer, 0.5, { opacity: 1 })
	// slide the copy and overlay up out of the canvas
	s1_0.to([copyContainer, subCopyContainer, overlay], 8, { top: '-50%' }, "+=8")
	// tilt the player body upward
	s1_0.to(playerBody, 0.7, {transformOrigin: 'center center', rotation: '350cw', y: 0}, "-=1")
	// stop the player from bouncing if reverse scrolling
	s1_0.call(() => playerIdleHop(true, elements), null, null)
	// make the player bounce
	s1_0.call(() => playerIdleHop(false, elements), null, null, "+=1")
	// make the player move through the scene
	movePlayer(s1_0, sceneElements, 'right', 490, 8);

	return s1_0;

} 
export default s1_0;
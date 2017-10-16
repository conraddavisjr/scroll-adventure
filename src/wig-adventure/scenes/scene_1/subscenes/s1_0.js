// build Scene One, Chapter 1.0
// 

// Present COPY - fade in
var s1_0 = (elements) => {

	console.log('elements: ', elements)
	const {
		copyContainer,
		subCopyContainer,
		playerBody,
		phoneSpriteGroup,
		staggerPhoneSprites,
		overlay,
		playerIdleHop,
	  flickeringPhonesTl

	} = elements

	var s1_0 = new TimelineMax()
	s1_0.set([copyContainer, subCopyContainer], { 
		css:{ 
			opacity: 0, 
			fontFamily: 'Roboto', 
			textAlign: 'center', 
			fontSize: '30px', 
			color:"#DCDCF7", 
			width: '100%',
	    top: '200px'
		}, 
		text: { value: `Women <br> are gaming at <br> unprecedented <br> numbers. `}
	})
	s1_0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '330ccw'})
	s1_0.to(copyContainer, 1, {opacity: 1}, "+=0.7")
	// stagger the phone sprites into view and make them flicker
	s1_0.call(staggerPhoneSprites)
	// fade out the copyContainer and the phone sprites
	s1_0.to([copyContainer, phoneSpriteGroup], 2.5, {opacity: 0}, "+=1.7")
	// stop the phones from flickering
	s1_0.call(() => flickeringPhonesTl.pause(), null, null)
	// rotate the player to look up
	s1_0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '310ccw'})
	s1_0.set(copyContainer, { 
		css:{ 
			fontSize: '7em',
			fontWeight: 'bold',
			top: '43px'
		}, 
		text: {value: `1%`}
	}, "+=0.5")

	var tcd = 0.3 //text count duration
	// count the text up to 65
	s1_0.to(copyContainer, 1, {opacity: 1}, "+=0.7")
	s1_0.to(copyContainer, tcd, {text: {value: `4%`}}, "+=0.7")
	s1_0.to(copyContainer, tcd, {text: {value: `9%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `12%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `18%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `25%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `37%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `46%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `52%`}})
	s1_0.to(copyContainer, tcd, {text: {value: `65%`}})
	// slide the overlay up
	s1_0.to(overlay, `${tcd * 9}`, {y: '-60%'}, `-=${tcd * 9}`)
	s1_0.set(subCopyContainer, {
		text: {value: `of women ages 10-65 <br> play games.`},
		css:{
			top: '165px'
		},
	})
	// fade in the sub copy
	s1_0.to(subCopyContainer, 0.5, { opacity: 1 })
	// slide the copy and 
	s1_0.to([copyContainer, subCopyContainer, overlay], 5, { top: '-100%' }, "+=8")
	s1_0.to(playerBody, 0.7, {transformOrigin: 'center center', rotation: '350cw', y: 0}, "-=1")
	s1_0.call(playerIdleHop, [true], null)
	s1_0.call(playerIdleHop, [false], null, "+=1")

	return s1_0;

} 
export default s1_0;
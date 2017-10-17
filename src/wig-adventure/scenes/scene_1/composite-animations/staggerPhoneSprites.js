// staggerPhoneSprites
var staggerPhoneSprites = (elements) => {
	console.log('staggerPhoneSprites CALLED - elements: ', elements)
	// destructure the neccessary elements
	const { 
		phoneSprites,
	  phoneSpritesGlow,
	  flickeringPhones 
	} = elements;

	var tl = new TimelineMax()
	// stagger the phones into view
	tl.staggerFromTo([...phoneSprites], 0.5, {opacity: 0, scale: 1, /*rotation: '40ccw'*/}, {opacity: 1, scale: 1, /*rotation: '0ccw'*/}, 0.1)
	tl.fromTo([...phoneSpritesGlow], 5, {opacity: 0}, {opacity: 1})
	// make the phones flicker
	tl.call(flickeringPhones, [false, elements], null, "-=3")

	return tl;
}

export default staggerPhoneSprites;
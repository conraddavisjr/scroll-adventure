var flickeringPhones = (paused, elements = {}) => {
	// destructure the elements passed in
	const { 
		phoneSprites,
	  phoneSpritesGlow,
	  flickeringPhonesTl 
	} = elements

	// make the phones flicker
	flickeringPhonesTl.add("startFlicking"); // place at the beginning of the desired testing area
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.5, {opacity: 0.6})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.3, {opacity: 0.8})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.2, {opacity: 0.7})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.7, {opacity: 1})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 1, {opacity: 0.6})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.5, {opacity: 0.7})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.3, {opacity: 0.8})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.2, {opacity: 1})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.7, {opacity: 0.8})
	flickeringPhonesTl.add("endFlickering"); // move to the end of desired testing area
	// infinitely loop the phone flickering after a single cycle
	flickeringPhonesTl.add(flickeringPhonesTl.tweenFromTo("startFlicking", "endFlickering", {repeat: -1}))
}

export default flickeringPhones;
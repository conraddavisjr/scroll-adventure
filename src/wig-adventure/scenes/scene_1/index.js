
import svgMaster from './svg-assets';

// init ScrollMagic controller
var controller = new ScrollMagic.Controller();

// state vars
let scrollPos;
let endPos;

// DOM elements
var bodyTag = document.querySelector('body')
var playerBody = document.getElementById('player-body');
var player = document.getElementById('player');
// render the player to the scene
player.innerHTML = svgMaster.player;

// var playerShadow = document.querySelector('.player-shadow');
var copyContainer = document.querySelector('.copy-container');
var environment = document.querySelector('.environment');
var rowOneLandscape_S1 = document.querySelector('.rowOneLandscape.s1');
var rowTwoLandscape_S1 = document.querySelector('.rowTwoLandscape.s1');
var rowThreeLandscape_S1 = document.querySelector('.rowThreeLandscape.s1');
var phoneSpriteGroup = document.querySelector('.phone-sprite-group');

// render the phone sprite to the scene
phoneSpriteGroup.innerHTML = svgMaster.phoneSprites;

// setup a selector for the phoneSprites svg
var phoneSprites = document.querySelectorAll('#phoneSprites_S1 [data-name="phone-sprite"]');
var phoneSpritesGlow = document.querySelectorAll('#phoneSprites_S1 [data-name="phone-sprite-glow"]');

var playerDefaultPosition = new TimelineMax()
playerDefaultPosition.set(playerBody, { x: 40 })

// build Scene One, Chapter 1.0
// 
// Present COPY - fade in
var s1C0 = new TimelineMax()
s1C0.set(copyContainer, { 
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
s1C0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '330ccw'})
s1C0.to(copyContainer, 1, {opacity: 1}, "+=0.7")
// stagger the phone sprites into view and make them flicker
s1C0.call(staggerPhoneSprites)
// fade out the copyContainer and the phone sprites
s1C0.to([copyContainer, phoneSpriteGroup], 1, {opacity: 0}, "+=1.7")
// stop the phones from flickering
s1C0.call(() => flickeringPhonesTl.pause(), null, null)
s1C0.to(playerBody, 0.3, {transformOrigin: 'center center', rotation: '310ccw'})
s1C0.set(copyContainer, { 
	css:{ 
		fontSize: '60px',
		fontWeight: 'bold'
	}, 
	text: {value: `1`}
}, "+=0.5")
s1C0.to(copyContainer, 1, {opacity: 1}, "+=0.7")
// s1C0.fromTo(copyContainer, 3, {text: {value: `0`}}, {text: {value: `+=100`}}, "+=0.7")
s1C0.call(numberCount, [copyContainer, 0, 100, 5])
// s1C0.fromTo(copyContainer, 1, {text: 1}, "+=0.7")

// build Scene One, Chapter 1.1
// var s1C1 = new TimelineMax()
// movePlayer(s1C1, 'right', 400, 1.5)

// // Scene One, Chapter Two
// // charater double jump forward
// var s1C2 = new TimelineMax()
// // Disable the scroll until this animation is complete
// 	s1C2.to(player, 0.5, 
// 	{ 
// 		bezier: {
//       type: "soft",
//       values: [
// 	      { x: '+=120', y: '-=330' }, 
// 	      { x: '+=140', y: '-=180' }
// 	    ] 
//     }
//   })
//   // movePlayer(s1C2, 'right', 100, 1)
// 	// s1C2.to(playerShadow, 0.5, { opacity: 0, x: '+=20', y: '+=370' }, "-=0.5")
//   // move environment
// 	// second jump
// 	s1C2.to(player, 1, 
// 	{ 
// 		bezier: {
//       type: "soft",
//       values: [
// 	      { x: '+=20', y: '-=10' }, 
// 	      { x: '+=140', y: '-=150' },
// 	      { x: '+=200', y: '+=175' }
// 	    ] 
//     },
//     ease: Power3.easeInOut
//   })



// // Scene One, Chapter Three
// var s1C3 = new TimelineMax()
// // player walking, environment moving
// movePlayer(s1C3, 'right', 400, 2)
// s1C3.to(player, 2, { x: '+=320'}, "-=2")

var scene1_0 = new ScrollMagic.Scene({ duration: 230, offset: 0 })
  .setTween(s1C0) // trigger a TweenMax.to tween
  .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
  .setPin("#scene") // pins the element for the the scene's duration
  .on("update", (event) => {
  	// console.log('event.scrollPos: ', event.scrollPos)
  	// console.log('event.endPos: ', event.endPos)
  	scrollPos = event.scrollPos;
  	endPos = event.endPos;
  })
  .addTo(controller)

// var scene1_1 = new ScrollMagic.Scene({ duration: 500, offset: 0 })
//   .setTween(s1C1) // trigger a TweenMax.to tween
//   .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
//   .setPin("#scene") // pins the element for the the scene's duration
//   .addTo(controller)

//  var scene1_2 = new ScrollMagic.Scene({ offset: 500 })
//   .setTween(s1C2) // trigger a TweenMax.to tween
//   .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
//   .setPin("#scene") // pins the element for the the scene's duration
//   .on('start', () => toggleScroll(s1C2.duration()))
//   .addTo(controller)

//  var scene1_3 = new ScrollMagic.Scene({ duration: 1000, offset: 550 })
//   .setTween(s1C3) // trigger a TweenMax.to tween
//   .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
//   // .setPin("#scene") // pins the element for the the scene's duration
//   .addTo(controller)

// 
// ANIMATION FUNCTIONS
// 

// Hopping player composition
function playerIdleHop() {
	var tl = new TimelineMax()
	tl.to(playerBody, 0.3, { y: -30, repeat:-1, yoyo:true, ease: Power1.easeOut })
	return tl;
}

// toggle scrolling on the body
function toggleScroll(delay) {
	bodyTag.classList.add('disabledScroll')
	setTimeout(() => {
		bodyTag.classList.remove('disabledScroll')
	}, `${delay * 1000}`)
}

// function for handling the environment movement when the player walks
function movePlayer(tween, direction, distance, timing) {
	let dir = direction == 'left' ? '+=' : '-=';
	tween.to(rowOneLandscape_S1, timing, { x: `${dir}${distance}` }), `-=${timing}`
	tween.to(rowTwoLandscape_S1, timing, { x: `${dir}${distance / 2}` }, `-=${timing}`)
	tween.to(rowThreeLandscape_S1, timing, { x: `${dir}${distance / 4}` }, `-=${timing}`)
}

// staggerPhoneSprites
function staggerPhoneSprites() {
	var tl = new TimelineMax()
	// stagger the phones into view
	tl.staggerFromTo([...phoneSprites], 0.5, {opacity: 0, scale: 1, /*rotation: '40ccw'*/}, {opacity: 1, scale: 1, /*rotation: '0ccw'*/}, 0.1)
	tl.fromTo([...phoneSpritesGlow], 5, {opacity: 0}, {opacity: 1})
	// make the phones flicker
	tl.call(flickeringPhones, null, null, "-=3")
}

var flickeringPhonesTl = new TimelineMax()
function flickeringPhones(paused) {
	console.log('flickeringPhones Called - pause status: ', paused)
	// if the the paused value is truthy, pause the flickeringPhones, otherwise play the animation
	scrollPos < endPos ? flickeringPhonesTl.play() : flickeringPhonesTl.pause()
	// make the phones flicker
	flickeringPhonesTl.add("startTest"); // place at the beginning of the desired testing area
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.5, {opacity: 0.6})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.3, {opacity: 0.8})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.2, {opacity: 0.7})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.7, {opacity: 1})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 1, {opacity: 0.6})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.5, {opacity: 0.7})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.3, {opacity: 0.8})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.2, {opacity: 1})
	flickeringPhonesTl.to([...phoneSprites, ...phoneSpritesGlow], 0.7, {opacity: 0.8})
	flickeringPhonesTl.add("endTest"); // move to the end of desired testing area
	// infinitely loop the phone flickering after a single cycle
	flickeringPhonesTl.add(flickeringPhonesTl.tweenFromTo("startTest", "startTest", {repeat: -1}))
}

function numberCount(element, startingNumber, finishNumber, duration) {
	console.log('numberCount CALLED')
	var count = startingNumber
	  TweenLite.to(element, duration, {number:`+=${finishNumber}`, onUpdate:updateNumber, ease:Linear.easeNone});
			
	function updateNumber() {
	  element.innerHTML = count;
	  if (count >= 100) return
	  count ++

	}
}


// function doubleJumpForward() {
// 	// charater double jump forward
// 	var tl = new TimelineMax()
// 	tl.to(player, 0.5, 
// 		{ 
// 			bezier: {
// 	      type: "soft",
// 	      values: [
// 		      { x: '+=120', y: '-=330' }, 
// 		      { x: '+=140', y: '-=200' }
// 		    ] 
// 	    }
// 	  })
// 	tl.to(playerShadow, 0.5, { opacity: 0, x: '+=20', y: '+=370' }, "-=0.5")
// 	// charater jump
// 	tl.to(player, 1, 
// 		{ 
// 			bezier: {
// 	      type: "soft",
// 	      values: [
// 		      { x: '+=20', y: '-=30' }, 
// 		      { x: '+=140', y: '-=150' },
// 		      { x: '+=200', y: '+=195' }
// 		    ] 
// 	    }
// 	  })
// 	tl.set(playerShadow, { opacity: 0, x: '-=15', y: '-=250' }, "-=1")
// 	tl.to(playerShadow, 0.5, { opacity: 0.5, x: '-=5', y: '-=120' }, "-=0.5")
// 	return tl;
// }

// Transition to the Living room stage
// 
// function transitionToLivingRoom() {
// 	var tl = new TimelineMax();
// 	tl.to(cube, 0.2, { transform:"rotateX(110deg) rotateY(40deg) translateX(-600px) translateY(1420px) translateZ(-900px)" })
// 	tl.to(camera, 1, { rotationX: '-20_ccw', rotationY: '930_cw', scale: 1.5, y: -190 }, "-=0.5")
// 	tl.to([topFace, rightFace, bottomFace, leftFace, backFace], 0.5, {opacity: 0.1}, "-=0.5")
// 	tl.to(topFace, 0.5, { transform:"rotateX(80deg) rotateY(-20deg) rotate(-100deg) translateZ(-500px) translateY(-500px) translateX(1000px)" }, "-=0.5")
// 	tl.to(rightFace, 0.5, { transform:"rotateY(0deg) rotateX(50deg) translateZ(-1500px) translateY(100px) translateX(-1000px)" }, "-=0.5")
// 	tl.to(bottomFace, 0.5, { transform:"rotateX(0deg) rotateY(0deg) translateZ(-1080px) translateY(1000px)" }, "-=0.5")
// 	tl.to(leftFace, 0.5, { transform:"rotateY(0deg) rotateX(0deg) translateZ(-1030px) translateY(300px)" }, "-=0.5")
// 	tl.to(frontFace, 0.5, { transform:"rotateY(-45deg) translateZ(-430px) translateY(-800px) translateX(700px)" }, "-=0.5") 
// 	tl.to(backFace, 0.5, { transform:"rotateY(100deg) rotateX(-20deg) translateZ(480px) translateY(-221px)" }, "-=0.5")
// 	tl.to(frontFace, 0.5, { transform:"rotateY(-70deg) translateZ(-700px) translateY(-1000px) translateX(200px) scale(4)" }, "-=0.3")
// 	tl.call(() => placeLivingRoomItems())
// 	return tl;
// }

// Event listeners
// frontFace.addEventListener('click', transitionToLivingRoom)

// MASTER TIMELINE
// 
// Create a master timeline and attach scenes to it
// 
var master = new TimelineMax()
// add scene one to the master
// .add(sceneOne(), "scene1");

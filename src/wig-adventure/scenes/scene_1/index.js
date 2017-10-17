
import svgMaster from './svg-assets';
import staggerPhoneSprites from './composite-animations/staggerPhoneSprites';
import flickeringPhones from './composite-animations/flickeringPhones';
import playerIdleHop from './composite-animations/playerIdleHop';

// init ScrollMagic controller
var controller = new ScrollMagic.Controller();

// state vars
let scrollPos;
let endPos;
let scrollingDirection;

// DOM elements
var bodyTag = document.querySelector('body')
var playerBody = document.getElementById('player-body');
var player = document.getElementById('player');
// render the player to the scene
player.innerHTML = svgMaster.player;

// var playerShadow = document.querySelector('.player-shadow');
var copyContainer = document.querySelector('.copy-container');
var subCopyContainer = document.querySelector('.sub-copy-container');
var environment = document.querySelector('.environment');
var rowOneLandscape_S1 = document.querySelector('.rowOneLandscape.s1');
var rowTwoLandscape_S1 = document.querySelector('.rowTwoLandscape.s1');
var rowThreeLandscape_S1 = document.querySelector('.rowThreeLandscape.s1');
var overlay = document.querySelector('#scene.s1 .overlay');
var phoneSpriteGroup = document.querySelector('.phone-sprite-group');

// render the phone sprite to the scene
phoneSpriteGroup.innerHTML = svgMaster.phoneSprites;

// setup a selector for the phoneSprites svg
var phoneSprites = document.querySelectorAll('#phoneSprites_S1 [data-name="phone-sprite"]');
var phoneSpritesGlow = document.querySelectorAll('#phoneSprites_S1 [data-name="phone-sprite-glow"]');

// global timelines scoped to Scene ONE
var flickeringPhonesTl = new TimelineMax()
var playerIdleHopTl = new TimelineMax()
var playerDefaultPosition = new TimelineMax()

playerDefaultPosition.set(playerBody, { x: 40 })


// 
// SCENE ONE TIMELINE
// 
import s1_0 from './subscenes/s1_0';
import s1_1 from './subscenes/s1_1';



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

// toggle scrolling on the body
function toggleScroll(delay) {
	bodyTag.classList.add('disabledScroll')
	setTimeout(() => {
		bodyTag.classList.remove('disabledScroll')
	}, `${delay * 1000}`)
}

// create a collection of all of the elements in scene ONE
var s1_Elements = {
	copyContainer, 
	subCopyContainer,
	environment,
	rowOneLandscape_S1,
	rowTwoLandscape_S1,
	rowThreeLandscape_S1,
	playerBody,
	phoneSpriteGroup,
	phoneSprites,
	phoneSpritesGlow,
	staggerPhoneSprites,
	overlay,
	playerIdleHop,
	flickeringPhones,
	flickeringPhonesTl,
	playerIdleHopTl
}

var s1_0_tween = s1_0(s1_Elements)
var scene1_0 = new ScrollMagic.Scene({ duration: 350, offset: 0 })
  .setTween(s1_0_tween) // trigger a TweenMax.to tween
  .addIndicators({name: "scene1_0"}) // add indicators (requires plugin)
  .setPin("#scene") // pins the element for the the scene's duration
  .on("update", (event) => {
  	// console.log('event.scrollPos: ', event.scrollPos)
  	// console.log('event.endPos: ', event.endPos)
  	scrollPos = event.scrollPos;
  	endPos = event.endPos;
  })
  .on("progress", (event) => {
  	scrollingDirection = event.scrollDirection;
  })
  .addTo(controller)


var s1_1_tween = s1_1(s1_Elements)
var scene1_1 = new ScrollMagic.Scene({ duration: 500, offset: 360 })
  .setTween(s1_1_tween) // trigger a TweenMax.to tween
  .addIndicators({name: "scene1_1"}) // add indicators (requires plugin)
  .setPin("#scene") // pins the element for the the scene's duration
  .addTo(controller)



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

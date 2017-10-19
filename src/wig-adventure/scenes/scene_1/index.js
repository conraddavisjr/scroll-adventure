import svgMaster from './svg-assets';
import staggerPhoneSprites from './composite-animations/staggerPhoneSprites';
import flickeringPhones from './composite-animations/flickeringPhones';
import playerIdleHover from './composite-animations/playerIdleHover';
import playerIdleHop from './composite-animations/playerIdleHop';
import toggleScroll from '../../helpers/toggleScroll';

// inject SCENE ONE HTML into the master scene
var masterScene = document.getElementById('master-scene')
masterScene.innerHTML += `
	<div id="scene" class="s1">
    <div id="camera">
      <div class="overlay"></div>
      <div class="copy-container"></div>
      <div class="sub-copy-container"></div>
      <div id="player-body">
        <div id="player"></div>
      </div>
      <div class="environment s1">
        <div class="phone-sprite-group"></div>
        <div class="rowThreeLandscape s1"></div>
        <div class="rowTwoLandscape s1"></div>
        <div class="rowOneLandscape s1"></div>
      </div>
    </div>
  </div>
`

// state Vars
var pageScrollPos;
// instantiate walkdistances for the scenes
window.s1_walkDistance = 10;

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
var playerIdleHoverTl = new TimelineMax()
var playerIdleHopTl = new TimelineMax()
// instantiate timeline for the subscenes
var s1_1_Tl = new TimelineMax()

var playerDefaultPosition = new TimelineMax()


// set the default position for the player
playerDefaultPosition.set(playerBody, { x: 40 })


// calculate offset
function calculateOffset(offset, prevDuration, prevOffset ) {
	return offset + prevDuration + prevOffset
}


// 
// ELEMENT COLLECTION
// create a collection of all of the elements in scene ONE
// 
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
	playerIdleHover,
	flickeringPhones,
	flickeringPhonesTl,
	playerIdleHopTl,
	playerIdleHoverTl,
	s1_1_Tl
}


// 
// SCENE ONE TIMELINE
// 
import s1_0 from './subscenes/s1_0';
import s1_1 from './subscenes/s1_1';
import s1_2 from './subscenes/s1_2';

// init ScrollMagic controller
var controller = new ScrollMagic.Controller();

var s1_0_tween = s1_0(s1_Elements, pageScrollPos);
var s1_0_duration = 3000;
var s1_0_offset = 0;
var scene1_0 = new ScrollMagic.Scene({ duration: s1_0_duration, offset: s1_0_offset })
  .setTween(s1_0_tween) // trigger a TweenMax.to tween
  // .addIndicators({name: "s1_0"}) // add indicators (requires plugin)
  .setPin("#scene") // pins the element for the the scene's duration
  .addTo(controller)

var s1_1_tween = s1_1(s1_Elements);
var s1_1_duration = 0;
var s1_1_offset = calculateOffset(40, s1_0_duration, s1_0_offset);
var scene1_1 = new ScrollMagic.Scene({ offset: s1_1_offset })
	.setTween(s1_1_tween) // trigger a TweenMax.to tween
	// .addIndicators({name: "scene1_1"}) // add indicators (requires plugin)
	// .setPin("#scene") // pins the element for the the scene's duration
	.on('start', (event) => {
		console.log('start Event: ', event)
		toggleScroll(s1_1_tween.duration())
		// console.warn('start CALLED- progress: ', event.progress)
	})
	.on('enter leave', (event) => console.warn(event.type))
	.on('update', (event) => {
		// console.warn('startPos: ', event.startPos, 'endPos: ', event.endPos, 'scrollPos: ', event.scrollPos)
		// console.log('this is the prev pageScrollPos: ', pageScrollPos);
		// console.log('s1_1_Tl: ', s1_1_Tl)

		if (event.scrollPos >= event.startPos && event.scrollPos <= event.startPos + 9){ console.log('s1_1_Tl.play() TRIGGERED'); s1_1_Tl.play()}
		
	})
	.addTo(controller)

console.warn(scene1_1.state())

var s1_2_tween = s1_2(s1_Elements)
var s1_2_duration = 2000;
var s1_2_offset = calculateOffset(20, s1_1_duration, s1_1_offset)
var scene1_2 = new ScrollMagic.Scene({ duration: s1_2_duration, offset: s1_2_offset })
	.setTween(s1_2_tween) // trigger a TweenMax.to tween
	// .addIndicators({name: "scene1_2"}) // add indicators (requires plugin)
	.setPin("#scene") // pins the element for the the scene's duration
	.addTo(controller)

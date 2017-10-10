// import Component from 'play-web-core/es6/component'

// init controller
// var controller = new ScrollMagic.Controller();
// var openBox = new TweenMax();
// console.log(openBox);

import svgMaster from './svg-assets';

// init ScrollMagic controller
var controller = new ScrollMagic.Controller();

// dom elements
var player = document.getElementById('player');
var environment = document.querySelector('.environment');
var rowOneLandscape_S1 = document.querySelector('.rowOneLandscape.s1');
var rowTwoLandscape_S1 = document.querySelector('.rowTwoLandscape.s1');
var rowThreeLandscape_S1 = document.querySelector('.rowThreeLandscape.s1');

// render
// 
// render the player to the scene
player.innerHTML = svgMaster.player;
// environment.innerHTML += `
// 	<div class="rowOneLandscape"> ${svgMaster.rowOneLandscape} </div>
// 	<div class="rowTwoEnvironment"> ${svgMaster.rowTwoLandscape} </div>
// `;


var playerOntoScreen = () => {
	var tl = new TimelineMax()
	tl.to(player, 1, { x: 200 })
	return tl;
}
playerOntoScreen();

// build Scene One, Chapter One
var s1C1 = new TimelineMax()
s1C1.to(rowOneLandscape_S1, 1, { x: -200 })
s1C1.to(rowTwoLandscape_S1, 1, { x: -100 }, "-=1")
s1C1.to(rowThreeLandscape_S1, 1, { x: -40 }, "-=1")

var scene1 = new ScrollMagic.Scene({ duration: 400, offset: 0 })
  .setTween(s1C1) // trigger a TweenMax.to tween
  .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
  .setPin("#scene") // pins the element for the the scene's duration
  .addTo(controller)

// 
// ANIMATION FUNCTIONS
// 
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

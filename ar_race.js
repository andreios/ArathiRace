"use strict";

/*
   Author: Andrew Luehrs
   Date:   12/2/18

   Filename: ar_race.js
*/

//create global references
var orc = document.getElementById("hordeRacer");
var human = document.getElementById("allyRacer");
var gate = document.getElementById("startgate");

var loopClock;



window.onload = init;

function init(){
	//initialize racer positions
	orc.style.left = "0px";
	human.style.left = "0px";
	
	//add listener to gate image
	gate.src = "gate_red.png";
	gate.onclick = startRace;
}

function startRace() {
	//swap red gate to green gate
	gate.src = "gate_green.png";
	gate.onclick = null;

//	runRace();
	loopClock = setInterval(runRace, 50);
}

function runRace(){
	//boolean variables to test win condition; may not be needed
	var winner = "";

	//establishes target for victory
	var threshold = (.8 * window.innerWidth)-200;

	advanceRacers(orc);
	advanceRacers(human);

	if (orc.offsetLeft >= threshold || human.offsetLeft >= threshold) {
		if(orc.offsetLeft > human.offsetLeft) {
			winScreen("horde");
		} else { winScreen("alliance"); }
	}	
}

function advanceRacers(racer){
	
	//store current image position
	var racerPos = parseInt(racer.style.left);
	
	//generate random shift amount
	var racerShift = Math.floor(20 * Math.random());
	
	//apply shift
	racerPos += racerShift;
	
	racer.style.left = (racerPos + "px");
}

function winScreen(winner) {		
	clearInterval(loopClock);

	init();
}


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

//get win screen elements
var victoryMessage = document.getElementById("victoryMessage");
var victoryBanner = document.getElementById("victoryBanner");
var resetMessage = document.getElementById("resetMessage");
var startMessage = document.getElementById("startMessage");
	
var loopClock;



window.onload = init;

function init(){
	//initialize racer positions
	orc.style.opacity = 1;
	human.style.opacity = 1;
	orc.style.left = "0px";
	human.style.left = "0px";
	
	startMessage.innerHTML = "Click on the red portal to start the combatants across the hills of Arathor.";
	
	//add listener to gate image
	gate.src = "gate_red.png";
	gate.onclick = startRace;
}

function startRace() {
	//swap red gate to green gate
	gate.src = "gate_green.png";
	gate.onclick = null;
	startMessage.innerHTML = "The race is on!";

//	runRace();
	loopClock = setInterval(runRace, 50);
}

function runRace(){
	//establishes target for victory
	var threshold = (0.82 * window.innerWidth)-200;

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
	var racerShift = Math.floor(25 * Math.random());
	
	//apply shift
	racerPos += racerShift;
	
	racer.style.left = (racerPos + "px");
}

function winScreen(winner) {		
	clearInterval(loopClock);
	
	//based on winner, set victory message, banner, and display them
	if (winner === "horde"){
		human.style.opacity = 0;
		victoryMessage.innerHTML = "Victory For the Horde!";
		victoryMessage.style.color = "firebrick";
		victoryBanner.src = "HordeBanner.png";
	} else if (winner === "alliance") {
		orc.style.opacity = 0;
		victoryMessage.innerHTML = "Victory For the Alliance!";
		victoryMessage.style.color = "mediumblue";
		victoryBanner.src = "AllianceBanner.png";
	}
	resetMessage.innerHTML = "Click on the green portal to reset the race.";
	resetMessage.style.color = "ghostwhite";
	
	gate.onclick = raceReset;
	victoryBanner.onclick = raceReset;

}

function raceReset() {
	gate.onclick = null;
	victoryBanner.onclick = null;
	victoryMessage.innerHTML = "";
	resetMessage.innerHTML = "";
	victoryBanner.src = "";
	
	init();

}


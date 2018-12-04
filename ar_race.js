"use strict";

/*
   Author: Andrew Luehrs
   Date:   12/2/18

   Filename: ar_race.js
*/

//add listener to gate image
var gate = document.getElementById("startgate");
gate.onclick = runRace;

function runRace() {
	//swap red gate to green gate
	gate.src = "gate_green.png";
	
	var hordeWin = false;
	var allyWin = false;
	
	advanceRacers();
	setInterval(advanceRacers,100);
}

function advanceRacers(){
	//create references for racer images
	var orc = document.getElementById("hordeRacer");
	var human = document.getElementById("allyRacer");
	
	//store current image position
	var orcPos = parseInt(orc.style.right);
	var humanPos = parseInt(human.style.right);
	
	//generate random shift amount
	var orcShift = Math.floor(5 * Math.random());
	var humanShift = Math.floor(5 * Math.random());
	
	//apply shift
	orcPos += orcShift;
	humanPos += humanShift;
	
	orc.style.right = (orcPos + "px");
	human.style.right = (humanPos + "px");
}


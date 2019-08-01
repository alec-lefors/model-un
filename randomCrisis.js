
const turn = 199;

const users = [
	{
		name: 'Alec',
		country: 2,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Cameron',
		country: 6,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Logan',
		country: 7,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		name: 'Joe',
		country: 1,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	}
];

const countries = ['United Mines of Eurasia', 'Maple', 'The Collective', 'The Unbeaten Scourge', 'East African Builder\'s Clan','ConnCo Global','Kimjung Islands', 'Alpinia Sanctuary','People\'s Republic of the Great Lakes','The Agency'];


const crises = [
	{
		name: 'Riot',
		message: '"The citizens are rioting!!\nPlease send aid!"',
		weights: {
			money: .15,
			military: .35,
			humanitarian: .15,
			intel: .20,
			material: .15
		}
	},
	{
		name: 'Drought',
		message: '"Our nation has faced severe drought!\nWe require assistance."',
		weights: {
			money: .40,
			military: 0,
			humanitarian: .40,
			intel: 0,
			material: .20
		}
	},
	{
		name: 'Flood',
		message: '"The relentless rain has caused raging floods throughout our country.\nPlease help us!"',
		weights: {
			money: .20,
			military: 0,
			humanitarian: .50,
			intel: 0,
			material: .30
		}
	},
	{
		name: 'Civil War',
		message: '"A faction of our country has declared war against us! Our citizens are under constant threat!\nSend help before the fighting gets worse!"',
		weights: {
			money: .30,
			military: .50,
			humanitarian: 0,
			intel: .20,
			material: 0
		}
	},
	{
		name: 'Nuclear Plant Cleanup',
		message: '"The nuclear plant accident in our nation threatens our people!\nPlease send aid!"',
		weights: {
			money: .60,
			military: 0,
			humanitarian: .20,
			intel: 0,
			material: .20
		}
	},
	{
		name: 'Earthquake',
		message: '"Earthquake damage has displaced many of our citizens!\nHelp us!"',
		weights: {
			money: .40,
			military: 0,
			humanitarian: .30,
			intel: 0,
			material: .30
		}
	}
]

const globalEcon = {
	money: 800,
	military: 800,
	humanitarian: 800,
	intel: 800,
	material: 800
}


npcOrPlayer(users, globalEcon, turn);

function npcOrPlayer(users, globalEcon, turn) {
	let randomNum = Math.random();

	if (true) {
		npcCrisis(globalEcon, turn);
	}
	else {
		playerCrisis(users, globalEcon, turn);
	}
}

function getCrisis() {
	const crisisIndex = Math.floor(Math.random() * (crises.length));
	return crises[crisisIndex];

}

function npcCrisis(globalEcon, turn) {
	const npcNames = ['King Eugene', 'Duke Reginald III', 'Queen Daphne', 'President Marcus', 'Princess Alicia', 'President Catherine'];
	const crisis = getCrisis();

	const affectedNPC = npcNames[Math.floor(Math.random() * (npcNames.length))];

	console.log(affectedNPC + ' says ' + crisis.message + '\nThis will cost: \n');

	const costs = getTotalCost(crisis, globalEcon, turn);

	console.log(costs);

}

function randomFill(amount, min, max) {
    const arr = [];
    let total = 0;

    // fill an array with random numbers
    for (let i = 0; i < amount; i++) arr.push(min + Math.random() * (max - min));

    // add up all the numbers
    for (let i = 0; i < amount; i++) total += arr[i];

    // normalise so numbers add up to 1
    for (let i = 0; i < amount; i++) arr[i] /= total;

    for (var i = 0; i < arr.length; i++) {
    	arr[i] = Math.round(100 * arr[i]) / 100;
    }

    return arr;
};

function sumOfGlobalEcon(globalEcon) {
	return Object.keys(globalEcon).reduce((sum,key)=>sum+parseFloat(globalEcon[key]||0),0);
}

function getTotalCost(crisis, globalEcon, turn) {
	let totalCost = Math.floor((.1 + (.001 * (turn - 1))) * sumOfGlobalEcon(globalEcon));
	let weightAdj = 0;
	let amount = 0;

	Object.keys(crisis.weights).forEach( (resource, index) => {
		let weight = crisis.weights[resource];
		if (weight != 0) {
			crisis.weights[resource] -= .10;
			weightAdj += .10;
			amount += 1;
		}
	});


	const adjustment = randomFill(amount, 0, weightAdj);
	let i = 0;

	Object.keys(crisis.weights).forEach( (resource, index) => {
		let weight = crisis.weights[resource];
		if (weight != 0) {
			crisis.weights[resource] += adjustment[i] * weightAdj;
			i++;
		}
	});

	return costs = {
		money: Math.floor(crisis.weights.money * totalCost),
		military: Math.floor(crisis.weights.military * totalCost),
		humanitarian: Math.floor(crisis.weights.humanitarian * totalCost),
		intel: Math.floor(crisis.weights.intel * totalCost),
		material: Math.floor(crisis.weights.material * totalCost)
	}
}
/*
function crisisSelect() {
	let selectedVal = Math.floor(Math.random() * (crisisArray.length + 1));

	console.log(`Oh Noes!!!! There is a ${crisisArray[selectedVal]}!!!! in Denmark!!!`);

}
*/

/*
crises.forEach((item) => {
	console.log('-------------------');
	console.log(item.name);
	console.log(item.message);
	console.log(item.weights);
});
*/

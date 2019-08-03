let users = [
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

const countries = [
	{
		id: 0,
		name: 'United Mines of Eurasia',
		gains: {
			money: 12,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 12
		}
	},
	{
		id: 1,
		name: 'Maple',
		gains: {
			money: 12,
			military: 10,
			humanitarian: 12,
			intel: 10,
			material: 10
		}
	},
	{
		id: 2,
		name: 'The Collective',
		gains: {
			money: 10,
			military: 12,
			humanitarian: 10,
			intel: 10,
			material: 12
		}
	},
	{
		id: 3,
		name: 'The Unbeaten Scourge',
		gains: {
			money: 12,
			military: 12,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	},
	{
		id: 4,
		name: 'East African Builder\'s Clan',
		gains: {
			money: 10,
			military: 10,
			humanitarian: 12,
			intel: 10,
			material: 12
		}
	},
	{
		id: 5,
		name: 'ConnCo Global',
		gains: {
			money: 14,
			military: 10,
			humanitarian: 8,
			intel: 10,
			material: 10
		}
	},
	{
		id: 6,
		name: 'Kimjung Islands',
		gains: {
			money: 10,
			military: 14,
			humanitarian: 10,
			intel: 10,
			material: 8
		}
	},
	{
		id: 7,
		name: 'Alpinia Sanctuary',
		gains: {
			money: 10,
			military: 8,
			humanitarian: 14,
			intel: 10,
			material: 10
		}
	},
	{
		id: 8,
		name: 'People\'s Republic of the Great Lakes',
		gains: {
			money: 8,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 14
		}
	},
	{
		id: 9,
		name: 'The Agency',
		gains: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 12,
			material: 10
		}
	}
];

users[0].country = countries[users[0].country];
users[1].country = countries[users[1].country];
users[2].country = countries[users[2].country];
users[3].country = countries[users[3].country];

function resourceGain(users) {

	users.forEach((user) => {

		Object.keys(user.economy).forEach((resource) => {
			user.economy[resource] += user.country.gains[resource];
		});

	});
	return users;

}
users = resourceGain(users);

console.log(users);


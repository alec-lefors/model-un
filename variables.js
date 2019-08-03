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

const nameList = [
	'Time','Past','Future','Dev',
	'Fly','Flying','Soar','Soaring','Power','Falling',
	'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
	'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
	'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
	'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
	'Mine','Your','Worst','Enemy','Hostile','Force','Video',
	'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
	'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
	'Script','Writer','Near','Close','Open','Cube','Circle',
	'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
	'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
	'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
	'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
	'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
	'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
	'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
	'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
	'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
	'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
	'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
];

module.exports = {
	countries: countries,
	users: users,
	nameList: nameList
}
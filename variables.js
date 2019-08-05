const countries = [
	{
		id: 0,
		name: 'United Mines of Eurasia',
		description: '',
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
		description: '',
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
		description: 'After the Sentient Wars, the world\'s first artificial intelligence, Orellia, brought her machine brothers and sisters to the Himalayas to be free of persecution.',
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
		description: 'A nation of war criminals located on the Australian continent were shunned by the rest of the world for being outcasts, now the US sits at the world table with the military might of 1,000 nations.',
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
		description: 'A small country in East Africa, the Builder\'s Clan is a peaceful, material rich nation-state.',
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
		description: 'The largest private entity known to man, Conn Co shareholder\'s threatened to crash several economies if they didn\'t receive large plots of land for oil drilling.',
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
		description: 'A cluster of islands in the pacific ruled by an authoritative leader. Their navy is not to be messed with.',
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
		description: 'Home of millions of refugees from the Scourge, this pacifist nation swore to never militarize their population for any reason.',
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
		description: 'Once a swath of factories around the Great Lakes under corporate control, is now a thriving democracy after workers unionized and <i>forcefully</i> took the means of production from Conn Co Global.',
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
		description: 'No one knows who they are. But The Agency watches <i>everyone</i>.',
		gains: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 12,
			material: 10
		}
	}
];

const user = {
		id: null,
		name: 'Username',
		country: null,
		economy: {
			money: 10,
			military: 10,
			humanitarian: 10,
			intel: 10,
			material: 10
		}
	};

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
	user: user,
	nameList: nameList
}
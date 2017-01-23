import {extendObservable, computed, action, autorun, observable} from 'mobx';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';
import shuffle from 'lodash/shuffle';

const initialJokes = [
	`A user interface is like a good joke. If you have to explain it, it's not that good.`,
	`I'm reading a book about anti-gravity. It's impossible to put down.`,
	`I wondered why the baseball was getting bigger. Then it hit me.`,
	`I'd tell you a chemistry joke but I know I wouldn't get a reaction.`,
	`I used to be a banker but I lost interest.`,
	`Have you ever tried to eat a clock? It's very time consuming.`,
	`Claustrophobic people are more productive thinking outside the box.`,
	`Why did the web designer storm out of the restaurant? She was offended by the table layout.`,
	`"Knock, knock.” “Who’s there?” very long pause…. “Java.”`,
	`A SQL query goes into a bar, walks up to two tables and asks, "Can I join you?"`,
	`To understand what recursion is, you must first understand recursion.`,
	`I tried to hire a javascript plumber the other day. He didn’t callback, but made a promise to fix a-sink for me.`,
	`What did the Southern web developer say when he found out his team stopped using version control? Y’all better Git!`,
	`Why was the JavaScript reality show cancelled after only one episode? People thought it seemed scripted.`,
	`You can't run through a camp site, you can only ran because it's past tents`,
	`Corduroy pillows are making headlines.`,
	`You want to clone yourself? Now wouldn't that be just like you!`,
	`Shout out to anyone wondering what the opposite of in is.`,
	`A walrus was frozen to absolute zero; he's 0K now.`,
	`Plateaus are the highest form of flattery.`,
];

function joke(text) {
	return {
		id: uniqueId('joke_'),
		text,
		createdAt: Date.now(),
		likes: 0,
		dislikes: 0,
		favorites: 0,
	};
}

class JokeStore {
	constructor() {
		const firstJokes = keyBy(shuffle(
			initialJokes.map(text => joke(text))
		), 'id');
		// We use extendObservable to set which properties of our model should 
		//  be reactive. When these properties change, mobx will trigger 
		//  reactions e.g: rerender things that depend on them, computed 
		//  properties, autoruns we've added
		extendObservable(this, {
			meta: {
				isLoading: false,
			},
			currentJokeIndex: 0,
			
			jokesById: observable(firstJokes),
			popularLimit: 2,

			// This is an example of a computed property, 
			//  When the dependencies update (in this case jokesById) and only 
			//  when deps update, this function will be called to reflect the 
			//  changes.
			popularJokes: computed(() => {
				const jokes = this.jokesAsArray;
				return jokes.filter(joke => joke.likes > this.popularLimit);
			}),

			// This will be run when we add a new joke to our jokesById obj
			jokesAsArray: computed(() => {
				return Object.keys(this.jokesById).map(
					id => this.jokesById[id]
				);
			}),
			hasNext: computed(() => (
				this.currentJokeIndex < (this.jokesAsArray.length - 1)
			)),
			hasPrevious: computed(() => this.currentJokeIndex > 0),
		});

		// autorun functions are called every time one of the depended on
		// properties are updated. 
		autorun(() => {
			// console.log(this.jokesAsArray.slice());
			// console.log(this.jokesAsArray.length);
			// console.log(this.currentJokeIndex);
		})
	}

	// This is an example of an action 
	// actions are used to modify state.
	addJokeAction = action('addJoke', (text) => {
		const newJoke = joke(text);

		// this.jokesById[newJoke.id] = newJoke;
		// this is common mistake: mobx by default only tracks existing 
		//  properties for objects. 
		//  https://mobx.js.org/best/react.html

		// Proper way to update objects, or we can use a mobx map / object
		//  https://mobx.js.org/refguide/object.html
		this.jokesById = {
			...this.jokesById,
			[newJoke.id]: newJoke,
		};
	})

	// If we use mobx in non-strict mode we can directly modify state
	// without having to wrap it in an action. 
	// addJoke = (text) => {
		// const newJoke = joke(text);

		// this.jokesById[newJoke.id] = newJoke;
		// this is common mistake: mobx by default only tracks existing 
		//  properties for objects. 
		//  https://mobx.js.org/best/react.html

		// Proper way to update objects, or we can use a mobx map / object
		//  https://mobx.js.org/refguide/object.html
		// this.jokesById = {
		//  ...this.jokesById,
		//  [newJoke.id]: newJoke,
		// };
	// }

	deleteJoke = action('deleteJoke', (id) => {
		this.jokesById = omit(this.jokesById, id);
	});

	likeJoke = action('likeJoke', (id) => {
		this.jokesById[id].likes++;
	});

	dislikeJoke = action('dislikeJoke', (id) => {
		this.jokesById[id].dislikes++;
	});

	favoriteJoke = action('favoriteJoke', (id) => {
		this.jokesById[id].favorites++;
	});

	goToNextJoke = action('goToNextJoke', () => {
		if (this.currentJokeIndex < this.jokesAsArray.length - 1) {
			this.currentJokeIndex++;
		}
	});

	goToPreviousJoke = action('goToPreviousJoke', () => {
		if (this.currentJokeIndex > 0) {
			this.currentJokeIndex--;
		}
	});
}

export default new JokeStore();

export {
	JokeStore
}
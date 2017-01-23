import {extendObservable, computed, action, autorun} from 'mobx';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';

function joke(text) {
	return {
		id: uniqueId('joke_'),
		text,
		createdAt: Date.now(),
		likes: 0,
		dislikes: 0,
	};
}

class JokeStore {
	constructor() {
		const firstJoke = joke('Why did the chicken cross the road?');
		// We use extendObservable to set which properties of our model should 
		//	be reactive. When these properties change, mobx will trigger 
		//	reactions e.g: rerender things that depend on them, computed 
		//	properties, autoruns we've added
		extendObservable(this, {
			currentJokeIndex: 0,
			hasPrevious: 0,
			hasNext: 0,
			jokesById: {
				[firstJoke.id]: firstJoke,
			},
			popularLimit: 2,

			// This is an example of a computed property, 
			//	When the dependencies update (in this case jokesById) and only 
			//	when deps update, this function will be called to reflect the 
			//	changes.
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
		});

		// autorun functions are called every time one of the depended on
		// properties are updated. 
		autorun(() => {
			console.log(this.jokesAsArray.slice());
		})
	}

	// This is an example of an action 
	// actions are used to modify state.
	addJokeAction = action((text) => {
		const newJoke = joke(text);

		// this.jokesById[newJoke.id] = newJoke;
		// this is common mistake: mobx by default only tracks existing 
		// 	properties for objects. 
		//  https://mobx.js.org/best/react.html

		// Proper way to update objects, or we can use a mobx map / object
		// 	https://mobx.js.org/refguide/object.html
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
		// 	properties for objects. 
		//  https://mobx.js.org/best/react.html

		// Proper way to update objects, or we can use a mobx map / object
		// 	https://mobx.js.org/refguide/object.html
		// this.jokesById = {
		// 	...this.jokesById,
		// 	[newJoke.id]: newJoke,
		// };
	// }

	deleteJoke = action((id) => {
		this.jokesById = omit(this.jokesById, id);
	});

	likeJoke = action((id) => {
		this.jokesById[id].likes++;
	});

	dislikeJoke = action((id) => {
		this.jokesById[id].dislikes++;
	});

	editJoke = action((id, newText) => {
		this.jokesById[id].text = newText;
	});
}

export default new JokeStore();

export {
	JokeStore
}
import {extendObservable, computed, action, autorun, observable} from 'mobx';
import omit from 'lodash/omit';

function joke(text) {
	return {
		text,
		createdAt: Date.now(),
		likes: 0,
		dislikes: 0,
		favorites: 0,
	};
}

function prefix(actionName) {
	return `jokeStore/${actionName}`;
}

class JokeStore {
	constructor(db) {
		// We use extendObservable to set which properties of our model should 
		//  be reactive. When these properties change, mobx will trigger 
		//  reactions e.g: rerender things that depend on them, computed 
		//  properties, autoruns we've added
		extendObservable(this, {
			meta: {
				isLoading: true,
				hasError: false,
				error: '',
			},
			currentJokeIndex: 0,
			jokesById: observable({}),
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
					id => Object.assign(
						{}, 
						this.jokesById[id],
						{id},
					)
				);
			}),
			hasNext: computed(() => (
				this.currentJokeIndex < (this.jokesAsArray.length - 1)
			)),
			hasPrevious: computed(() => this.currentJokeIndex > 0),
			currentJoke: computed(
				() => this.jokesAsArray[this.currentJokeIndex] || {}
			),
		});

		// Once we get the results from the database we want to update and
		// set the action to 
		db.on('value', action(prefix('updateJokes'), snapshot => {
			this.jokesById = {
				...this.jokesById,
				...snapshot.val(),
			};
			this.meta.isLoading = false;
		}), action(prefix('updateJokesError'), err => {
			this.meta.isLoading = false;
			this.meta.hasError = true;
			this.meta.error = err.code;
		}));

		// autorun functions are called every time one of the depended on
		// properties are updated. 
		autorun(() => {
			// console.log(this.jokesAsArray.slice());
		});
	}

	// This is an example of an action 
	// actions are used to modify state.
	addJokeAction = action(prefix('addJoke'), (text) => {
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

	deleteJoke = action(prefix('deleteJoke'), (id) => {
		this.jokesById = omit(this.jokesById, id);
	});

	likeJoke = action(prefix('likeJoke'), (id) => {
		this.jokesById[id].likes++;
	});

	dislikeJoke = action(prefix('dislikeJoke'), (id) => {
		this.jokesById[id].dislikes++;
	});

	favoriteJoke = action(prefix('favoriteJoke'), (id) => {
		this.jokesById[id].favorites++;
	});

	changeJoke = action(prefix('changeJoke'), (direction) => {
		if (direction === 'previous' && this.hasPrevious) {
			this.currentJokeIndex--;
		}

		if (direction === 'next' && this.hasNext) {
			this.currentJokeIndex++;
		}
	});
}

// export default new JokeStore();

export {
	JokeStore
}
import {extendObservable, action} from 'mobx';
import omit from 'lodash/omit';

function prefix(actionName) {
	return `userStore/${actionName}`;
}

const Reactions = {
	like: 'LIKE',
	dislike: 'DISLIKE',
};

class UserStore {
	constructor() {
		extendObservable(this, {
			username: null,
			reactedJokes: {},
			favoriteJokes: {},
		});
	}

	isLiked(id) {
		return this.reactedJokes[id] === Reactions.like;
	}

	isDisliked(id) {
		return this.reactedJokes[id] === Reactions.dislike;
	}

	likeJoke = action(prefix('likeJoke'), id => {
		const currentReaction = this.reactedJokes[id];

		if (currentReaction === Reactions.like) {
			this.reactedJokes = omit(this.reactedJokes, id);
		} else {
			this.reactedJokes = {
				...this.reactedJokes,
				[id]: Reactions.like,
			}
		}
	});

	dislikeJoke = action(prefix('dislikeJoke'), id => {
		const currentReaction = this.reactedJokes[id];
		if (currentReaction === Reactions.dislike) {
			this.reactedJokes = omit(this.reactedJokes, id);
		} else {
			this.reactedJokes = {
				...this.reactedJokes,
				[id]: Reactions.dislike,
			}
		}
	});

	favoriteJoke = action(prefix('favoriteJoke'), id => {
		const currentReaction = this.favoriteJokes[id];
		this.favoriteJokes = {
			...this.favoriteJokes,
			[id]: !currentReaction,
		};
	});
}

export default new UserStore();
export {
	UserStore,
};
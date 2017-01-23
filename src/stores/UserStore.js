import {extendObservable, action} from 'mobx';
import omit from 'lodash/omit';


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

	likeJoke = action('userStore/likeJoke', id => {
		const currentReaction = this.reactedJokes[id];

		if (currentReaction === Reactions.like) {
			this.reactedJokes = omit(this.reactedJokes, id);
		} else {
			this.reactedJokes = {
				...this.reactedJokes,
				[id]: Reactions.like,
			}
		}
	})

	dislikeJoke = action('userStore/dislikeJoke', id => {
		const currentReaction = this.reactedJokes[id];
		if (currentReaction === Reactions.dislike) {
			this.reactedJokes = omit(this.reactedJokes, id);
		} else {
			this.reactedJokes = {
				...this.reactedJokes,
				[id]: Reactions.dislike,
			}
		}
	})

	favoriteJoke = action('userStore/favoriteJoke', id => {
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
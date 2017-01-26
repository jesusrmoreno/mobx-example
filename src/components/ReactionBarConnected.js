import React from 'react';
import {inject, observer} from 'mobx-react';
import ReactionBarDisplay from './ReactionBarDisplay';

export default inject('jokeStore', 'userStore')(observer(
	class ReactionBarConnected extends React.Component {
		render() {
			const {jokeStore, userStore} = this.props;
			const joke = jokeStore.currentJoke;
			if (jokeStore.meta.isLoading) {
				return null;
			}
			return (
				<ReactionBarDisplay 
					onDislike={() => {
						jokeStore.dislikeJoke(joke.id)
						userStore.dislikeJoke(joke.id)
					}}
					onLike={() => {
						jokeStore.likeJoke(joke.id)
						userStore.likeJoke(joke.id)
					}}
					onFavorite={() => {
						jokeStore.favoriteJoke(joke.id)
						userStore.favoriteJoke(joke.id)
					}}
					hasLiked={userStore.isLiked(joke.id)}
					hasDisliked={userStore.isDisliked(joke.id)}
					hasFavorited={userStore.favoriteJokes[joke.id]}
				/>
			);
		}
	}
));


import React from 'react';
import ReactDOM from 'react-dom';

import jokeStore from './stores/JokeStore';
import userStore from './stores/UserStore';
import uiStore from './stores/UIStore';

import {useStrict} from 'mobx';
import {observer} from 'mobx-react';

import JokeDisplay from './components/presentational/JokeDisplay';
import ReactionBarDisplay from './components/presentational/ReactionBarDisplay';

import './index.css';

// Disallow updating store state outside of actions
useStrict(true);

const NavigationArrow = ({direction, enabled, onClick, firstTime}) => (
	<div style={{
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 16,
		width: 64,
		height: 64,
		backgroundColor: !firstTime ? 'rgba(255, 255, 255, .57)' : 'transparent',
		borderRadius: '100%',
		overflow: 'hidden',
		transform: `translateX(${direction === 'right' ? '10px' : '-10px'})`,
		cursor: 'pointer',
		opacity: enabled ? 1 : 0,
		transition: 'all 250ms',
	}} onClick={enabled ? onClick : () => {}}>
		{enabled && <i className={`fa fa-fw fa-2x fa-arrow-${direction}`} />}
	</div>
);
// We wrap our app in the observer decorator to be able to
// 	react to changes in the store
const App = observer(({jokeStore, userStore, uiStore}) => {
	const joke = jokeStore.jokesAsArray[jokeStore.currentJokeIndex];
	return (
		<div style={{
			background: '#FEDB5A',
			width: '100vw',
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
		}}>	
			<JokeDisplay isEmpty={false} key={joke.id} text={joke.text} />
			<div style={{display: 'flex', alignItems: 'center', paddingBottom: 8}}>
				<NavigationArrow 
					direction="left" 
					enabled={jokeStore.hasPrevious}
					firstTime={uiStore.hasClickedNav}
					onClick={() => {
						jokeStore.goToPreviousJoke()
						uiStore.setClicked()
					}}
				/>
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
				<NavigationArrow 
					direction="right" 
					enabled={jokeStore.hasNext}
					firstTime={uiStore.hasClickedNav}
					onClick={() => {
						jokeStore.goToNextJoke()
						uiStore.setClicked()
					}}
				/>
			</div>
		</div>
	);
});

ReactDOM.render(
	<App jokeStore={jokeStore} userStore={userStore} uiStore={uiStore} />,
	document.getElementById('root')
);

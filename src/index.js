import React from 'react';
import ReactDOM from 'react-dom';

import {JokeStore} from './stores/JokeStore';
import userStore from './stores/UserStore';
import uiStore from './stores/UIStore';

import {useStrict} from 'mobx';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import JokeDisplay from './components/presentational/JokeDisplay';
import ReactionBarDisplay from './components/presentational/ReactionBarDisplay';
import NavigationBarDisplay from './components/presentational/NavigationBarDisplay';

import './index.css';

import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAPsQu38dzjKXlUvRFrSp-wmyKPsL9cwvc",
	authDomain: "jokeapp-1580d.firebaseapp.com",
	databaseURL: "https://jokeapp-1580d.firebaseio.com",
	storageBucket: "jokeapp-1580d.appspot.com",
	messagingSenderId: "1047992017421"
};

const fb = firebase.initializeApp(config).database().ref("jokes");
window.fire = fb;
const jokeStore = new JokeStore(fb);

// Disallow updating store state outside of actions
useStrict(true);

const NavigationArrow = ({direction, enabled, onClick, firstTime}) => {
	const classes = classnames({
		navigationArrow: true,
		[`navigationArrow--${direction}`]: true,
		'navigationArrow--enabled': enabled,
		'navigationArrow--disabled': !enabled,
	});
	return (
		<div className={classes} onClick={enabled ? onClick : () => {}}>
			{enabled && <i className={`fa fa-fw fa-2x fa-arrow-${direction}`} />}
		</div>
	);
};

// We wrap our app in the observer decorator to be able to
// 	react to changes in the store
const App = observer(({jokeStore, userStore, uiStore}) => {
	const joke = jokeStore.jokesAsArray[jokeStore.currentJokeIndex] || {};
	return (
		<div style={{
			background: '#FEDB5A',
			width: '100vw',
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
		}}>	
			<JokeDisplay isEmpty={jokeStore.meta.isLoading} key={joke.id} text={joke.text} />
			{!jokeStore.meta.isLoading && <div style={{display: 'flex', alignItems: 'center', paddingBottom: 8}}>
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
			</div>}
			{!jokeStore.meta.isLoading && <NavigationBarDisplay items={
				[{
					caption: 'jokes',
					iconName:  'fa-smile-o',
				}, {
					caption: 'favorites',
					iconName:  'fa-heart',
				}, {
					caption: 'profile',
					iconName:  'fa-user',
				}]
			}/>}
		</div>
	);
});

ReactDOM.render(
	<App jokeStore={jokeStore} userStore={userStore} uiStore={uiStore} />,
	document.getElementById('root')
);

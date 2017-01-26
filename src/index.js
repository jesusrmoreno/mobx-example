import React from 'react';
import ReactDOM from 'react-dom';

import {useStrict} from 'mobx';
import {Provider, observer} from 'mobx-react';

// Import Stores
import {JokeStore} from './mobxStores/JokeStore';
import userStore from './mobxStores/UserStore';
import uiStore from './mobxStores/UIStore';

import classnames from 'classnames';

import JokeDisplayConnected from './components/JokeDisplayConnected';
import ReactionBarConnected from './components/ReactionBarConnected';
import NavigationArrowConnected from './components/NavigationArrowConnected';
import NavigationBarConnected from './components/NavigationBarConnected';

import * as firebase from 'firebase';
import DevTools from 'mobx-react-devtools';
import './index.css';

const config = {
	apiKey: "AIzaSyAPsQu38dzjKXlUvRFrSp-wmyKPsL9cwvc",
	authDomain: "jokeapp-1580d.firebaseapp.com",
	databaseURL: "https://jokeapp-1580d.firebaseio.com",
	storageBucket: "jokeapp-1580d.appspot.com",
	messagingSenderId: "1047992017421"
};

const fb = firebase.initializeApp(config).database().ref("jokes");
const jokeStore = new JokeStore(fb);

// Disallow updating store state outside of actions
useStrict(true);

// We wrap our app in the observer decorator to be able to
// 	react to changes in the store
const App = observer(() => {
	return (
		<div style={{
			background: '#FEDB5A',
			width: '100vw',
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
		}}>	
			<DevTools />
			<JokeDisplayConnected />
			<div style={{display: 'flex', alignItems: 'center', paddingBottom: 8}}>
				<NavigationArrowConnected direction="previous" />
				<ReactionBarConnected />
				<NavigationArrowConnected direction="next" />
			</div>
			{<NavigationBarConnected items={
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
	)
});

ReactDOM.render(
	<Provider jokeStore={jokeStore} uiStore={uiStore} userStore={userStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import jokeStore from './stores/JokeStore';
import {useStrict} from 'mobx';
import {observer} from 'mobx-react';
import './index.css';


// Disallow updating store state outside of actions
useStrict(true);

const JokeDisplay = ({joke}) => {
	return (
		<div>
			{joke.text}
		</div>
	);
};

// We wrap our app in the observer decorator to be able to
// 	react to changes in the store
const App = observer(({jokeStore}) => {
	return (
		<div style={{
			background: '#FEDB5A',
			width: '100vw',
			height: '100vh',
		}}>
			{jokeStore.jokesAsArray.map(joke => {
				return <JokeDisplay key={joke.id} joke={joke} />;
			})}
		</div>
	);
});

ReactDOM.render(
	<App jokeStore={jokeStore}/>,
	document.getElementById('root')
);

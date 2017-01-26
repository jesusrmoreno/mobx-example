import React from 'react';
import {inject, observer} from 'mobx-react';
import JokeDisplay from './JokeDisplay';

export default inject('jokeStore')(
	observer(class JokeDisplayConnected extends React.Component {
		render() {
			const {jokeStore} = this.props;
			return (
				<JokeDisplay 
					isEmpty={jokeStore.meta.isLoading} 
					key={jokeStore.currentJoke.id} 
					text={jokeStore.currentJoke.text} 
				/>
			);
		}
	})
);



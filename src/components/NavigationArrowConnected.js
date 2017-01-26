import React from 'react';
import {inject, observer} from 'mobx-react';
import NavigationArrow from './NavigationArrow';

export default inject('jokeStore', 'uiStore')(observer(
	class NavigationArrowConnected extends React.Component {
		render() {
			const {jokeStore, uiStore, direction} = this.props;
			return (
				<NavigationArrow 
					direction={direction}
					enabled={
						direction === 'previous' 
							? jokeStore.hasPrevious 
							: jokeStore.hasNext
					}
					firstTime={uiStore.hasClickedNav}
					onClick={() => {
						jokeStore.changeJoke(direction);
						uiStore.setClicked();
					}}
				/>
			);
		}
	}
));
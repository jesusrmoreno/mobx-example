import React from 'react';
import {inject, observer} from 'mobx-react';
import NavigationBarDisplay from './NavigationBarDisplay';

export default inject('jokeStore', 'uiStore')(
	observer(class NavigationBarConnected extends React.Component {
		render() {
			const {jokeStore, uiStore, items} = this.props;
			if (jokeStore.meta.isLoading) {
				return null;
			}
			return (
				<NavigationBarDisplay items={items}/>
			);
		}
	})
);

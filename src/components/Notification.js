import React from 'react';

export default class Notification extends React.Component {
	render() {
		const {message} = this.props;
		return (
			<div style={{
				height: 48, 
				lineHeight: 48,
				width: '80vw',
				textAlign: 'center',
			}}>
				{message}
			</div>
		);
	}
}
import React from 'react';

const JokeDisplay = ({isEmpty, id, text, createdAt, likes, dislikes}) => (
	<div className="clickable" style={{
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center', 
		color: 'rgba(0, 0, 0, .87)',
		textAlign: 'center',
		width: '100%',
		padding: 16,
		maxWidth: '100%',
		flex: 1,
	}}>
		{isEmpty && (
			<div style={{fontSize: '2rem', fontWeight: 600}}>
				<div><i className="fa fa-fw fa-meh-o fa-2x" /></div>
			</div>
		)}
		{!isEmpty && <div style={{fontSize: '2rem', fontWeight: 600}}>{text}</div>}
	</div>
);

export default JokeDisplay;
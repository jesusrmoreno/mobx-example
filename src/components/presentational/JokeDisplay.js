import React from 'react';

const JokeDisplay = ({isEmpty, id, text, createdAt, likes, dislikes}) => (
	<div className="clickable jokeDisplay">
		{isEmpty && (
			<div className="jokeDisplay_content">
				<div><i className="fa fa-fw fa-meh-o fa-2x" /></div>
			</div>
		)}
		{!isEmpty && <div className="jokeDisplay_content">{text}</div>}
	</div>
);

export default JokeDisplay;
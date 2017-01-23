import React from 'react';
const Reaction = ({onClick, iconClass, reactedIconClass, caption, hasReacted}) => (
	<div onClick={onClick} style={{
		textAlign: 'center',
		flex: 1, 
		padding: 8,
		border: 'none',
		color: hasReacted ? 'white' : 'black',
		background: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 600,
		transition: 'all 75ms',
		transform: `scaleX(${hasReacted ? '1.3' : '1'}) scaleY(${hasReacted ? '1.3' : '1'})`
	}}>
		<div><i className={hasReacted && reactedIconClass ? reactedIconClass : iconClass} /></div>
		<div style={{padding: 8}}>{caption}</div>
	</div>
);

const ReactionBarDisplay = ({onLike, onDislike, onFavorite, hasLiked, hasDisliked, hasFavorited}) => (
	<div style={{
		display: 'flex',
		flex: 1,
	}}>
		<Reaction 
			caption="MEH" 
			hasReacted={hasDisliked}
			onClick={onDislike} 
			iconClass="fa fa-meh-o fa-fw fa-3x" 
		/>
		<Reaction 
			caption="LOL" 
			hasReacted={hasLiked}
			onClick={onLike} 
			iconClass="fa fa-smile-o fa-fw fa-3x" 
		/>
		<Reaction 
			caption="FAV" 
			hasReacted={hasFavorited}
			onClick={onFavorite}
			reactedIconClass="fa fa-heart fa-fw fa-3x" 
			iconClass="fa fa-heart-o fa-fw fa-3x" 
		/>
	</div>
);

export default ReactionBarDisplay;
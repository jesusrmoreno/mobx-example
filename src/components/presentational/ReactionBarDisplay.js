import React from 'react';

const Styles = {
	ReactionContainer: {
		flex: 1, 
		padding: 8,

		border: 'none',
		outline: 'none',
		background: 'none',
		
		textAlign: 'center',
		fontWeight: 600,
		cursor: 'pointer',
		transition: 'all 75ms',
	},

	Caption: {
		padding: 8,
	}
};

const Reaction = ({onClick, iconClass, reactedIconClass, caption, hasReacted}) => (
	<div onClick={onClick} style={{
		...Styles.ReactionContainer,
		color: hasReacted ? 'white' : 'black',
		transform: `scale(${hasReacted ? '1.3' : '1'})`,
	}}>
		<div>
			<i className={
				hasReacted && reactedIconClass 
					? reactedIconClass 
					: iconClass
			} />
		</div>
		<div style={Styles.Caption}>
			{caption}
		</div>
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
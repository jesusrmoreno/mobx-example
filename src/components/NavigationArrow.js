import React from 'react';
import classnames from 'classnames';

const NavigationArrow = ({direction, enabled, onClick, firstTime}) => {
	const dir = direction === 'previous' ? 'left' : 'right';
	const classes = classnames({
		navigationArrow: true,
		[`navigationArrow--${dir}`]: true,
		'navigationArrow--enabled': enabled,
		'navigationArrow--disabled': !enabled,
	});
	return (
		<div className={classes} onClick={enabled ? onClick : () => {}}>
			{enabled && <i className={`fa fa-fw fa-2x fa-arrow-${dir}`} />}
		</div>
	);
};

export default NavigationArrow;
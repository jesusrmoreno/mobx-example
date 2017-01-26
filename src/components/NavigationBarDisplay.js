import React from 'react';

const NavigationBarDisplay = ({items}) => (
	<div style={{display: 'flex', backgroundColor: 'rgba(255, 255, 255, .57)', borderTop: '1px solid rgba(255, 255, 255, 0.8)'}}>
		{items.map((item, i) => (
			<div key={item.caption + i} style={{textAlign: 'center', padding: 8, flex: 1}}>
				<div><i className={`fa fa-fw fa-2x ${item.iconName}`} /></div>
				<div style={{padding: '8px 0px 0px', fontWeight: 600, textTransform: 'uppercase'}}>{item.caption}</div>
			</div>
		))}
	</div>
);

export default NavigationBarDisplay;
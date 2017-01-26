import {extendObservable, action} from 'mobx';

function prefix(actionName) {
	return `uiStore/${actionName}`;
}

class UIStore {
	constructor() {
		extendObservable(this, {
			hasClickedNav: false,
		});
	}

	setClicked = action(prefix('setClicked'), () => {
		this.hasClickedNav = true;
	});
}

export default new UIStore();
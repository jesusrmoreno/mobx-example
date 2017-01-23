import {extendObservable, action} from 'mobx';

class UIStore {
	constructor() {
		extendObservable(this, {
			hasClickedNav: false,
		});
	}

	setClicked = action('setClicked', () => {
		this.hasClickedNav = true;
	});
}

export default new UIStore();
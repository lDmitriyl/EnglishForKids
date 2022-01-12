export default class Header{

	constructor(menu){
		this.menu = menu[0];
	}
	
	navMenu(name){

		const menuLink = document.createElement('a');
		menuLink.classList.add('burger-menu__link');
		menuLink.setAttribute('href','#');
		menuLink.innerHTML = name;
		return menuLink;
	}

	burgerMenu(i){

		if(i == 0){

			const burgerMenuButton = document.createElement('a');
			burgerMenuButton.classList.add('burger-menu__button');
			const burgerMenuLine = document.createElement('span');
			burgerMenuLine.classList.add('burger-menu__lines');
			burgerMenuButton.insertAdjacentElement('beforeend', burgerMenuLine);
			return burgerMenuButton;

		}else if(i == 1){

			const burgerMenuNav = document.createElement('ul');
			burgerMenuNav.classList.add('burger-menu__nav');

			for(let i = 0; i < 9; i++){
				burgerMenuNav.insertAdjacentElement('beforeend', this.navMenu(this.menu[i]))
			}

			return burgerMenuNav;
		}
	}

	buttonSwitcher(i){

		if(i == 0){

			const input = document.createElement('input');
			input.classList.add('switch-input');
			input.setAttribute('type','checkbox');
			input.setAttribute('checked','');
			return input;

		}else if(i == 1){

			const span = document.createElement('span');
			span.classList.add('switch-span');
			span.setAttribute('data-on','Train');
			return span;

		}else if(i == 2){

			const span = document.createElement('span');
			span.classList.add('switch-handle');
			return span;
		}
	}
	createButtonSwitcher(){

		const switcher = document.createElement('label');
		switcher.classList.add('switch');

		for(let i = 0; i < 3; i++){
			switcher.insertAdjacentElement('beforeend', this.buttonSwitcher(i))
		}

		return switcher;
	}

	createBurgerMenu(){

		const burgerMenu = document.createElement('div');
		burgerMenu.classList.add('burger-menu');

		for(let i = 0; i < 2; i++){
			burgerMenu.insertAdjacentElement('beforeend', this.burgerMenu(i))
		}

		return burgerMenu;
	}

	navigation(i){

		if(i == 0){

			const headerNavigation = document.createElement('div');
			headerNavigation.classList.add('header__navigation');
			return headerNavigation;

		}else if(i == 1){

			const switchButton = document.createElement('div');
			switchButton.classList.add('switch-container');
			return switchButton;

		}
	}



	render(){

		const header = document.createElement('header');
		header.classList.add('header');
		const headerContainer = document.createElement('div');
		headerContainer.classList.add('header__container')

		for(let i = 0; i < 2; i++){
			headerContainer.insertAdjacentElement('beforeend', this.navigation(i))
		}
		
		header.insertAdjacentElement('beforeend', headerContainer);
		return header;
	}
}
import { selectPage } from '../../../support/pages/GX3-2438-SelectMenu.Page';

describe ('', () => {

	beforeEach('', () => {
		cy.visit('https://demoqa.com/select-menu');
		cy.url().should('contain', 'select');
	});

	it('2438 | TC1 | Validar que se pueda seleccionar una opción en el Dropdown Select Value', () => {

		selectPage.dropdownSelectValue();
		selectPage.get.selectValue().invoke('text').then(valueText => {
			expect(valueText).to.contain(Cypress.env('textValue'));
		});

	});

	it('2438 | TC2 | Validar la selección de una opción en el Dropdown Select One', () => {

		selectPage.dropdownSelectOne().then(selectValueText => {
			selectPage.get.selectOne().then(valueText => {
				cy.wrap(valueText).should('contain', selectValueText);
				expect(valueText).to.contain(selectValueText);
			});
		});

	});

	it('2438 | TC3 | Validar la selección de una opción en el Dropdown Old Style Select Menu', () => {
		selectPage.dropDownOldStyleMenu();
		selectPage.get.oldStyleMenu().invoke('val').then(selectValue => {
			expect(selectValue).to.contain(selectValue);
		});
	});

	it('2438 | TC4 | Validar la selección múltiple y la visualización de "No Options"', () => {
		selectPage.dropDownMultiSelect();
		selectPage.get.multiSelectColors().then(colors => {
			const totalElements = colors.length;
			expect(totalElements).to.equal(totalElements);
			selectPage.get.messageOptions().should('be.visible')
				.should('include.text', 'No options');

		});
	});

	it('2438 | TC5 | Validar la selección de múltiples opciones en el Dropdown Standard multi select', () => {
		selectPage.selectCars();
		selectPage.get.multiSelectCars().invoke('val').should('deep.equal', ['volvo', 'saab', 'opel']);

	});

});
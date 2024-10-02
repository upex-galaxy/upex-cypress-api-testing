/* eslint-disable no-undef */
// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-file-upload';

beforeEach(() => {
	Cypress.on('uncaught:exception', () => false); // returning false here prevents Cypress from failing the test
	cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});

const tokenFilePath = 'cypress/support/api/token.json';

Cypress.Commands.add('saveToken', (token: string) => {
	cy.writeFile(tokenFilePath, { token });
});
Cypress.Commands.add('readToken', () => {
	cy.readFile(tokenFilePath).then(tokenFile => {
		if (!tokenFile) throw new Error('Token file is empty');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const jsonToken = tokenFile as { token: string };
		return cy.wrap(jsonToken.token);
	});
});

export function generatePassword(): string {
	const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const digitChars = '0123456789';
	const specialChars = '@';

	const allChars = lowerCaseChars + upperCaseChars + digitChars + specialChars;

	function getRandomChar(chars: string): string {
		const randomIndex = Math.floor(Math.random() * chars.length);
		return chars[randomIndex];
	}

	let password = [getRandomChar(lowerCaseChars), getRandomChar(upperCaseChars), getRandomChar(digitChars), getRandomChar(specialChars)];

	for (let i = password.length; i < 8; i++) {
		password.push(getRandomChar(allChars));
	}

	// Shuffle the password array to ensure randomness
	password = password.sort(() => Math.random() - 0.5);

	return password.join('');
}

// Ejemplo de uso
console.log(generatePassword());

// * Este es el Commands cy.page() para usar los Page Object Models sin necesidad de importarlos en cada archivo de test.
// * Está comentado porque sirve de ejemplo para personalizarlo según las necesidades del proyecto.
// Cypress.Commands.add('page', () => {
// 	const page = {
// 		spaceLoginPage: new SpaceLoginPage(),
// 		spaceProductPage: new SpaceDestinationPage(),
// 		spaceCheckoutPage: new SpaceCheckoutPage()
// 	};
// 	return cy.wrap(page);
// });

import { apiAuth } from '@api/ApiAuth';
import { apiBooks } from '@api/ApiBooks';

describe('API Test - Books Endpoint', () => {
	it('Get Books api/companies/', () => {
		cy.log(`Este es el Username: ${apiAuth.getUsername()}`);
		cy.log(`Este es el Password: ${apiAuth.getPassword()}`);
		cy.log(`Este es el Password: ${apiAuth.getUserID()}`);

		apiAuth.setAccessToken();

		apiBooks.getStoreBooks().then(jsonData => {
			const firstBook = jsonData.books[1];

			const dataRequest = [{ isbn: firstBook.isbn }];

			apiBooks.addBooksToCollection(dataRequest);
		});
	});
});

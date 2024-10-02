import { APIRequest } from './Api';
import type { AddBooksRequest, GetStoreBooksResponse, IsbnBookData } from './interface/books';
import type { ApiBooksEndpoints } from './interface/endpoints';

class ApiBooks extends APIRequest {
	endpoint: ApiBooksEndpoints;

	constructor() {
		super();
		this.endpoint = {
			getBooks: '/BookStore/v1/Books',
			postBooks: '/BookStore/v1/Books'
		};
	}

	getStoreBooks() {
		return this.get({
			endpoint: this.endpoint.getBooks
		}).then(response => {
			expect(response.status).to.eq(200);
			const jsonData = response.body as GetStoreBooksResponse;
			return jsonData;
		});
	}

	addBooksToCollection(booksToAdd: IsbnBookData[]) {
		const body: AddBooksRequest = {
			userId: this.getUserID(),
			collectionOfIsbns: booksToAdd
		};
		return cy.readToken().then(token => {
			cy.log(`Este es el Access Token: ${token}`);
			const headers = {
				authorization: `Bearer ${token}`
			};
			return this.post({
				endpoint: this.endpoint.getBooks,
				headers,
				body
			}).then(response => {
				const jsonData = response.body as IsbnBookData;
				return { response, jsonData };
			});
		});
	}
}

export const apiBooks = new ApiBooks();

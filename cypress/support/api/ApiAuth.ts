import { generatePassword } from '../commands';
import { APIRequest } from './Api';
import type { UserResponse } from './interface/books';

class ApiAuth extends APIRequest {
	authEndpoint: string;
	newUserEndpoint: string;

	constructor() {
		super();
		this.authEndpoint = '/Account/v1/GenerateToken'; //post
		this.newUserEndpoint = '/Account/v1/User'; //post
	}

	createNewUserPassword() {
		return generatePassword();
	}

	createNewUser() {
		const requestData = {
			userName: this.getUsername(),
			password: this.getPassword()
		};
		this.post({
			endpoint: this.newUserEndpoint,
			body: requestData
		}).then(({ status, body }) => {
			const jsonData = body as UserResponse;
			expect(status).to.eq(201);
			expect(jsonData).to.have.property('userID');
		});
	}

	setAccessToken() {
		this.post({
			endpoint: this.authEndpoint,
			body: {
				userName: this.getUsername(),
				password: this.getPassword()
			}
		}).then(({ status, body }) => {
			const jsonBody = body as unknown as { token: string };
			expect(status).to.eq(200);
			expect(jsonBody).to.have.property('token');
			cy.saveToken(jsonBody.token);
		});
		this.getToken();
	}

	getToken() {
		return cy.readToken().then(token => {
			if (!token) throw new Error('Token file is empty');
			return token;
		});
	}
}

export const apiAuth = new ApiAuth();

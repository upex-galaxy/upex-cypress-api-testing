export class APIRequest {
	getUsername() {
		const username = Cypress.env('username') as string;
		if (!username) {
			throw new Error('Username is not defined');
		}
		return username;
	}
	getPassword() {
		const password = Cypress.env('password') as string;
		if (!password) {
			throw new Error('Password is not defined');
		}
		return password;
	}
	getUserID() {
		const userID = Cypress.env('userId') as string;
		if (!userID) {
			throw new Error('User ID is not defined');
		}
		return userID;
	}

	get(arg: { endpoint: string; qs?: object; headers?: object | undefined }) {
		const { qs, headers } = arg;

		return cy
			.api({
				url: arg.endpoint,
				method: 'GET',
				headers,
				qs
			})
			.then(response => {
				return response;
			});
	}

	post(arg: { endpoint: string; qs?: object; body?: Cypress.RequestBody; headers?: object | undefined }) {
		const { qs } = arg;
		const { body } = arg;
		const { headers } = arg;

		return cy
			.api({
				url: arg.endpoint,
				method: 'POST',
				headers,
				qs,
				body
			})
			.then(response => {
				return response;
			});
	}
}

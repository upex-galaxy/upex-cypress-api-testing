/* eslint-disable @typescript-eslint/naming-convention */
export interface AddBooksRequest {
	userId: string;
	collectionOfIsbns: IsbnBookData[];
}

export interface IsbnBookData {
	isbn: string;
}

export interface UserResponse {
	userID: string;
	username: string;
	books: BookData[];
}

export interface GetStoreBooksResponse {
	books: BookData[];
}

export interface BookData {
	isbn: string;
	title: string;
	subTitle: string;
	author: string;
	publish_date: string;
	publisher: string;
	pages: 0;
	description: string;
	website: string;
}

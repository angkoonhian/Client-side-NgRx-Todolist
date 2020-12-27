export class User {
    // basic constructor to store user data.
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

    // get token, check if tokenExpiration is up, if it is up or it doesn not exist, return null, token is invalid.
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}
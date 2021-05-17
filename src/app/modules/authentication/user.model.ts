export class User {
  constructor(
    public email: string,
    public id: string,
    private authToken: string,
    private tokenExpirationDate: Date
  ) {
  }

  get token(): string | null {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.authToken;
  }
}

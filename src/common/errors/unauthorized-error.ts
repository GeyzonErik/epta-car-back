export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class BaseError extends Error {
    constructor() {
        super();
    }

    public toString(): string {
        return `
Error: ${this.name}
Message: ${this.message}
        `;
    }
}

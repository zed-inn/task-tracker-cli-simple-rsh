import { DomainError } from "./domain.error";

export class EntityValidationError extends Error implements DomainError {
  readonly error: string = "validation_error";
  readonly code: string;
  readonly ctx?: unknown;

  constructor(code: string, messsage: string, ctx?: unknown) {
    super(messsage);
    this.ctx = ctx;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

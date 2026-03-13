import { DomainError } from "task_tracker_core";

export class InvalidCommandError extends DomainError {
  readonly error: string = "validation_error";
  readonly code: string = "INVALID_COMMAND";

  constructor() {
    super("Invalid command to operate the application.");
  }
}

import { DomainError } from "@errors/domain.error";

export class InvalidStatusFlowError extends DomainError {
  readonly error: string = "validation_error";
  readonly code: string = "INVALID_STATUS_FLOW";

  constructor(statusOld: string, statusNew: string) {
    super(`Status of task cannot go from '${statusOld}' to '${statusNew}'.`);
  }
}

export class NoTaskError extends DomainError {
  readonly error: string = "not_found";
  readonly code: string = "TASK_NOT_FOUND";

  constructor() {
    super("The requested task does not exist.");
  }
}

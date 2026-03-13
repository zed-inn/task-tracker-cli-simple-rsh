import { DomainError } from "@errors/domain.error";

export class InvalidStatusFlowError extends DomainError {
  readonly error: string = "validation_error";
  readonly code: string = "INVALID_STATUS_FLOW";

  constructor(statusOld: string, statusNew: string) {
    super(`Status of task cannot go from '${statusOld}' to '${statusNew}'.`);
  }
}

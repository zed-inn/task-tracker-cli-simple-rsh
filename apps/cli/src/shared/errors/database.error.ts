import { DomainError } from "task_tracker_core";

export class DataCorruptedError extends DomainError {
  readonly error: string = "database_error";
  readonly code: string = "DATA_CORRUPTION";

  constructor() {
    super("Data file is corrupted, Data format is compromised.");
  }
}

export class NonUniqueIdError extends DomainError {
  readonly error: string = "database_error";
  readonly code: string = "NON_UNIQUE_ID_SAVE";

  constructor() {
    super("No two task can have same ids.");
  }
}

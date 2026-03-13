import { EntityValidationError } from "@domain/errors/entity-validation.error";
import { VO } from "@domain/value-objects/base.vo";
import { Id } from "@domain/value-objects/id.vo";

export class TaskId extends Id<"TaskId"> {
  constructor(id: number) {
    if (typeof id !== "number")
      throw new EntityValidationError(
        "INVALID_TYPE_TASK_ID",
        "Task id is of type number.",
        { provided_type: typeof id },
      );
    if (isNaN(id))
      throw new EntityValidationError(
        "NAN_TASK_ID",
        "Task id cannot be non-number",
      );
    if (id <= 0)
      throw new EntityValidationError(
        "NEGATIVE_TASK_ID",
        "Task id cannot be negative",
      );
    if (!Number.isInteger(id))
      throw new EntityValidationError(
        "NON_INTEGER_TASK_ID",
        "Task id must be an integer",
      );
    super(id);
  }
}

export class TaskName extends VO<string> {
  protected _value: string;

  constructor(name: string) {
    super();
    if (typeof name !== "string")
      throw new EntityValidationError(
        "INVALID_TYPE_TASK_NAME",
        "Task name is of type string.",
        { provided_type: typeof name },
      );
    if ((name = name.trim()).length < 1)
      throw new EntityValidationError(
        "EMPTY_TASK_NAME",
        "Task name cannot be empty.",
      );
    this._value = name;
  }
}

export class TaskStatus extends VO<"PENDING" | "IN PROGRESS" | "DONE"> {
  private readonly validValues = ["PENDING", "IN PROGRESS", "DONE"] as const;
  protected _value: (typeof this.validValues)[number];

  constructor(status: string) {
    super();
    if (typeof status !== "string")
      throw new EntityValidationError(
        "INVALID_TYPE_TASK_STATUS",
        "Task status is of type string.",
        { provided_type: typeof status },
      );
    status = status.trim();
    if (!this.validValues.includes(status as any))
      throw new EntityValidationError(
        "INVALID_VALUE_TASK_STATUS",
        "Task status can only be: 'PENDING' | 'IN PROGRESS' | 'DONE'.",
      );
    this._value = status as (typeof this.validValues)[number];
  }
}

export class Task {
  private readonly _id: TaskId;
  private _name: TaskName;
  private _status: TaskStatus;

  constructor(params: { id: number; name: string }) {
    this._id = new TaskId(params.id);
    this._name = new TaskName(params.name);
    this._status = new TaskStatus("PENDING");
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get status() {
    return this._status;
  }

  rename(name: TaskName) {
    this._name = name;
  }

  markAsInProgress() {
    this._status = new TaskStatus("IN PROGRESS");
  }

  markAsDone() {
    this._status = new TaskStatus("DONE");
  }
}

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

export class TaskDescription extends VO<string> {
  protected _value: string;

  constructor(description: string) {
    super();
    if (typeof description !== "string")
      throw new EntityValidationError(
        "INVALID_TYPE_TASK_DESCRIPTION",
        "Task description is of type string.",
        { provided_type: typeof description },
      );
    if ((description = description.trim()).length < 1)
      throw new EntityValidationError(
        "EMPTY_TASK_DESCRIPTION",
        "Task description cannot be empty.",
      );
    this._value = description;
  }
}

export type TaskStatusType = "todo" | "in-progress" | "done";
export class TaskStatus extends VO<TaskStatusType> {
  protected _value: TaskStatusType;

  constructor(status: TaskStatusType) {
    super();
    if (typeof status !== "string")
      throw new EntityValidationError(
        "INVALID_TYPE_TASK_STATUS",
        "Task status is of type string.",
        { provided_type: typeof status },
      );
    status = status.trim() as TaskStatusType;
    if (!["todo", "in-progress", "done"].includes(status))
      throw new EntityValidationError(
        "INVALID_VALUE_TASK_STATUS",
        "Task status can only be: 'todo' | 'in-progress' | 'done'.",
      );
    this._value = status;
  }
}

export class Task {
  private readonly _id: TaskId;
  private _description: TaskDescription;
  private _status: TaskStatus;

  constructor(params: {
    id: number;
    description: string;
    status: TaskStatusType;
  }) {
    this._id = new TaskId(params.id);
    this._description = new TaskDescription(params.description);
    this._status = new TaskStatus(params.status);
  }

  public get id() {
    return this._id;
  }
  public get description() {
    return this._description;
  }
  public get status() {
    return this._status;
  }

  redescribe(description: TaskDescription) {
    this._description = description;
  }

  markAsInProgress() {
    this._status = new TaskStatus("in-progress");
  }

  markAsDone() {
    this._status = new TaskStatus("done");
  }
}

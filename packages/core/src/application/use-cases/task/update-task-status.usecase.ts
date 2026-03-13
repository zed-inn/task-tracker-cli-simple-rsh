import { TaskId, TaskStatus, type TaskStatusType } from "@domain/entities/task";
import { InvalidStatusFlowError } from "@errors/tasks.errors";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";

type UpdateTaskStatusCommand = {
  id: number;
  status: string;
};

export class UpdateTaskStatus {
  constructor(private readonly taskRepo: TaskRepository) {}

  serialize(cmd: UpdateTaskStatusCommand) {
    return {
      id: new TaskId(cmd.id),
      status: new TaskStatus(cmd.status as TaskStatusType),
    };
  }

  async execute(cmd: UpdateTaskStatusCommand) {
    const { id, status } = this.serialize(cmd);

    const task = await this.taskRepo.getById(id);

    if (task.status.v === "todo" && status.v === "in-progress")
      task.markAsInProgress();
    else if (task.status.v === "in-progress" && status.v === "done")
      task.markAsDone();
    else throw new InvalidStatusFlowError(task.status.v, status.v);

    this.taskRepo.save(task);
  }
}

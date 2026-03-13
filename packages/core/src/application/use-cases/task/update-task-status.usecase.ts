import { TaskId, TaskStatus } from "@domain/entities/task";
import { InvalidStatusFlowError } from "@errors/tasks.errors";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";

type UpdateTaskStatusCommand = {
  id: number;
  status: string;
};

export class UpdateTaskStatus {
  constructor(private readonly taskRepo: TaskRepository) {}

  serialize(cmd: UpdateTaskStatusCommand) {
    return { id: new TaskId(cmd.id), status: new TaskStatus(cmd.status) };
  }

  async execute(cmd: UpdateTaskStatusCommand) {
    const { id, status } = this.serialize(cmd);

    const task = await this.taskRepo.getById(id);

    if (status.v === "IN PROGRESS" && task.status.v === "PENDING")
      task.markAsInProgress();
    else if (status.v === "DONE" && task.status.v === "IN PROGRESS")
      task.markAsDone();
    else throw new InvalidStatusFlowError(task.status.v, status.v);

    this.taskRepo.save(task);
  }
}

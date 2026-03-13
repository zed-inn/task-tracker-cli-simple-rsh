import { TaskId } from "@domain/entities/task";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";

type DeleteTaskCommand = {
  id: number;
};

export class DeleteTask {
  constructor(private readonly taskRepo: TaskRepository) {}

  serialize(cmd: DeleteTaskCommand) {
    return { id: new TaskId(cmd.id) };
  }

  async execute(cmd: DeleteTaskCommand) {
    const { id } = this.serialize(cmd);

    const task = await this.taskRepo.getById(id);

    this.taskRepo.remove(task);
  }
}

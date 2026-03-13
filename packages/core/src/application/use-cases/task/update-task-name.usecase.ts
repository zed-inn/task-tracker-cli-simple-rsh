import { TaskId, TaskName } from "@domain/entities/task";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";

type UpdateTaskNameCommand = {
  id: number;
  name: string;
};

export class UpdateTaskName {
  constructor(private readonly taskRepo: TaskRepository) {}

  serialize(cmd: UpdateTaskNameCommand) {
    return { id: new TaskId(cmd.id), name: new TaskName(cmd.name) };
  }

  async execute(cmd: UpdateTaskNameCommand) {
    const { id, name } = this.serialize(cmd);

    const task = await this.taskRepo.getById(id);
    task.rename(name);

    this.taskRepo.save(task);
  }
}

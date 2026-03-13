import { TaskId, TaskDescription } from "@domain/entities/task";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";

type UpdateTaskDescriptionCommand = {
  id: number;
  description: string;
};

export class UpdateTaskDescription {
  constructor(private readonly taskRepo: TaskRepository) {}

  serialize(cmd: UpdateTaskDescriptionCommand) {
    return {
      id: new TaskId(cmd.id),
      description: new TaskDescription(cmd.description),
    };
  }

  async execute(cmd: UpdateTaskDescriptionCommand) {
    const { id, description } = this.serialize(cmd);

    const task = await this.taskRepo.getById(id);
    task.redescribe(description);

    this.taskRepo.save(task);
  }
}

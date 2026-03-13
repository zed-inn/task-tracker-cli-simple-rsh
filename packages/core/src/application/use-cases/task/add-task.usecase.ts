import { Task, TaskDescription } from "@domain/entities/task";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";
import type { IdGenerator } from "@interfaces/utils/id-generator.interface";

type AddTaskCommand = {
  description: string;
};

export class AddTask {
  constructor(
    private readonly idGen: IdGenerator,
    private readonly taskRepo: TaskRepository,
  ) {}

  serialize(cmd: AddTaskCommand) {
    return { description: new TaskDescription(cmd.description) };
  }

  async execute(cmd: AddTaskCommand) {
    const { description } = this.serialize(cmd);

    const id = await this.idGen.generateInt();
    const task = new Task({ id, description: description.v });

    await this.taskRepo.save(task);
  }
}

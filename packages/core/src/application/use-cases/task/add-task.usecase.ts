import { Task, TaskName } from "@domain/entities/task";
import type { TaskRepository } from "@interfaces/repository/task-repository.interface";
import type { IdGenerator } from "@interfaces/utils/id-generator.interface";

type AddTaskCommand = {
  name: string;
};

export class AddTask {
  constructor(
    private readonly idGen: IdGenerator,
    private readonly taskRepo: TaskRepository,
  ) {}

  serialize(cmd: AddTaskCommand) {
    return { name: new TaskName(cmd.name) };
  }

  async execute(cmd: AddTaskCommand) {
    const { name } = this.serialize(cmd);

    const id = await this.idGen.generateInt();
    const task = new Task({ id, name: name.v });

    await this.taskRepo.save(task);
  }
}

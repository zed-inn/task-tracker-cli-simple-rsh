import { core } from "@config/core.js";
import { InvalidCommandError } from "@errors/server.error.js";
import {
  AddTaskSchema,
  DeleteTaskSchema,
  ListTasksByStatusSchema,
  UpdateTaskDescriptionSchema,
  UpdateTaskStatusSchema,
} from "@shared/routes.schema.js";

const [command, ...args] = process.argv.slice(2);

async function main() {
  try {
    switch (command) {
      case "add":
        await core.addTask.execute(
          AddTaskSchema.parse({ description: args[0] }),
        );
        console.log("Task added.");
        break;

      case "update":
        await core.updateTaskDescription.execute(
          UpdateTaskDescriptionSchema.parse({
            id: args[0],
            description: args[1],
          }),
        );
        console.log("Task updated.");
        break;

      case "mark-in-progress":
        await core.updateTaskStatus.execute(
          UpdateTaskStatusSchema.parse({ id: args[0], status: "in-progress" }),
        );
        console.log("Marked as In progress.");
        break;

      case "mark-done":
        await core.updateTaskStatus.execute(
          UpdateTaskStatusSchema.parse({ id: args[0], status: "done" }),
        );
        console.log("Marked as Done.");
        break;

      case "delete":
        await core.deleteTask.execute(DeleteTaskSchema.parse({ id: args[0] }));
        console.log("Task deleted.");
        break;

      case "list":
        const tasks = await (args[0]
          ? core.listTasksByStatus.execute(
              ListTasksByStatusSchema.parse({ status: args[0] }),
            )
          : core.listTasks.execute());
        if (tasks.length === 0) console.log("No task found.");
        for (const task of tasks) console.log(task);
        break;

      default:
        throw new InvalidCommandError();
    }
  } catch (error) {
    console.log(`Error: ${(error as any).message}`);
  }
}

main();

import { TaskModel } from "@interfaces/json-system/repo/tasks.repo.js";
import { z } from "zod";

export const AddTaskSchema = TaskModel.pick({ description: true });

export const UpdateTaskDescriptionSchema = TaskModel.pick({
  id: true,
  description: true,
});

export const UpdateTaskStatusSchema = TaskModel.pick({
  id: true,
  status: true,
});

export const ListTasksByStatusSchema = TaskModel.pick({
  status: true,
});

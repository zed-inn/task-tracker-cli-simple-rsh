import { JsonFileSystemIdGenerator } from "@interfaces/json-system/utils/id-generator.js";
import { TaskApplication } from "task_tracker_core";
import { env } from "./env.js";
import { JsonFileSystemTaskRepo } from "@interfaces/json-system/repo/tasks.repo.js";
import { JsonFileSystemTaskQuery } from "@interfaces/json-system/queries/task-query.js";

const jsonIdGenerator = new JsonFileSystemIdGenerator(env.datafile);
const jsonTaskRepo = new JsonFileSystemTaskRepo(env.datafile);
const jsonTaskQuery = new JsonFileSystemTaskQuery(env.datafile);

export const core = new TaskApplication(
  jsonIdGenerator,
  jsonTaskRepo,
  jsonTaskQuery,
);

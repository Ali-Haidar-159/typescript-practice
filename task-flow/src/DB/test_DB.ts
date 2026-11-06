import { readFile, writeFile } from "node:fs/promises";
import type { Task } from "../model/task";

const tasksFile = new URL("../../tasks.json", import.meta.url);
let writeQueue: Promise<void> = Promise.resolve();

async function writeTask(task: Task): Promise<void> {
  let tasks: unknown[] = [];

  try {
    const contents = await readFile(tasksFile, "utf8");
    const parsed: unknown = JSON.parse(contents);

    if (!Array.isArray(parsed)) {
      throw new TypeError("The tasks JSON file must contain an array.");
    }

    tasks = parsed;
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? error.code
        : undefined;

    if (code !== "ENOENT") {
      throw error;
    }
  }

  tasks.push(task);
  await writeFile(tasksFile, `${JSON.stringify(tasks, null, 2)}\n`, "utf8");
}

export function appendTask(task: Task): Promise<void> {
  const write = writeQueue.then(() => writeTask(task));
  writeQueue = write.catch(() => {});
  return write;
}

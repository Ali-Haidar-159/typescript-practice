import { dataStore, deleteData, openDB, readData } from "./DB/indexDB.js";
import type { Task } from "./models/task.js";

function handleSubmit(
  ee: SubmitEvent,
  taskForm: HTMLFormElement,
  existingTask?: Task,
): Task | void {
  ee.preventDefault();

  const form = new FormData(taskForm);
  const titleValue = form.get("title");
  const descriptionValue = form.get("description");
  const departmentValue = form.get("department");
  const userValue = form.get("user");
  const statusValue = form.get("status");

  if (
    typeof titleValue !== "string" ||
    typeof descriptionValue !== "string" ||
    typeof departmentValue !== "string" ||
    typeof userValue !== "string" ||
    (statusValue !== "completed" && statusValue !== "not-completed")
  ) {
    return;
  }

  const task: Task = {
    id: existingTask?.id ?? Date.now().toString(),
    title: titleValue,
    description: descriptionValue,
    department: departmentValue,
    status: statusValue,
    user: {
      id: existingTask?.user.id ?? `user_${Date.now().toString()}`,
      name: userValue,
    },
  };

  return task;
}

function renderTasks(tasks: Task[], taskList: HTMLElement, taskCount: HTMLElement): void {
  taskCount.textContent = tasks.length.toString();
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "Your tasks will appear here.";
    taskList.append(emptyState);
    return;
  }

  for (const task of tasks) {
    const card = document.createElement("article");
    card.className = "task-card";

    const title = document.createElement("h3");
    title.textContent = task.title;
    card.append(title);

    const department = document.createElement("p");
    department.className = "task-field";
    department.textContent = `Department: ${task.department}`;
    card.append(department);

    const description = document.createElement("p");
    description.className = "task-field";
    description.textContent = `Description: ${task.description}`;
    card.append(description);

    const user = document.createElement("p");
    user.className = "task-field";
    user.textContent = `User: ${task.user.name}`;
    card.append(user);

    const status = document.createElement("p");
    status.className = "task-field";
    status.textContent = `Status: ${task.status === "completed" ? "Completed" : "Not completed"}`;
    card.append(status);

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.append(
      createTaskAction("edit", task.id, "Edit"),
      createTaskAction("delete", task.id, "Delete"),
    );
    card.append(actions);
    taskList.append(card);
  }
}

function createTaskAction(action: "edit" | "delete", taskId: string, label: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `task-action task-action--${action}`;
  button.dataset.action = action;
  button.dataset.taskId = taskId;
  button.textContent = label;
  return button;
}

document.addEventListener(
  "DOMContentLoaded",
  async function (): Promise<void> {
    const taskForm: HTMLFormElement = document.getElementById(
      "task-form",
    ) as HTMLFormElement;
    const taskList = document.getElementById("task-list") as HTMLElement;
    const taskCount = document.getElementById("task-count") as HTMLElement;
    const formMessage = document.getElementById("form-message") as HTMLElement;
    const submitButton = taskForm.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    const cancelEditButton = document.getElementById(
      "cancel-edit",
    ) as HTMLButtonElement;
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const departmentInput = document.getElementById(
      "department",
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "description",
    ) as HTMLTextAreaElement;
    const userInput = document.getElementById("user") as HTMLInputElement;
    const statusSelect = document.getElementById("status") as HTMLSelectElement;

    let db: IDBDatabase;
    let tasks: Task[];
    let editingTaskId: string | null = null;

    function finishEditing(): void {
      editingTaskId = null;
      taskForm.reset();
      submitButton.textContent = "Create task";
      cancelEditButton.hidden = true;
    }

    try {
      db = await openDB("Task_DB", "tasks");
      tasks = await readData(db);
      renderTasks(tasks, taskList, taskCount);
    } catch (error) {
      console.error("Unable to load tasks:", error);
      formMessage.textContent = "Unable to load tasks. Please refresh the page.";
      return;
    }

    taskForm.addEventListener("submit", async function (ee: SubmitEvent) {
      const existingTask = tasks.find((task) => task.id === editingTaskId);
      const task = handleSubmit(ee, taskForm, existingTask);
      if (!task) {
        formMessage.textContent = "Please enter valid task details.";
        return;
      }

      try {
        await dataStore(db, task);
        tasks = await readData(db);
        renderTasks(tasks, taskList, taskCount);
        finishEditing();
        formMessage.textContent = "Task saved successfully.";
      } catch (error) {
        console.error("Unable to save task:", error);
        formMessage.textContent = "Unable to save the task. Please try again.";
      }
    });

    taskList.addEventListener("click", async function (event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target.closest<HTMLButtonElement>(
        "button[data-action][data-task-id]",
      );
      const action = button?.dataset.action;
      const taskId = button?.dataset.taskId;
      if (!button || !taskId || (action !== "edit" && action !== "delete")) {
        return;
      }

      const task = tasks.find((item) => item.id === taskId);
      if (!task) {
        return;
      }

      if (action === "edit") {
        editingTaskId = task.id;
        titleInput.value = task.title;
        departmentInput.value = task.department;
        descriptionInput.value = task.description;
        userInput.value = task.user.name;
        statusSelect.value = task.status;
        submitButton.textContent = "Update task";
        cancelEditButton.hidden = false;
        formMessage.textContent = `Editing "${task.title}".`;
        titleInput.focus();
        return;
      }

      try {
        await deleteData(db, task.id);
        tasks = await readData(db);
        renderTasks(tasks, taskList, taskCount);
        if (editingTaskId === task.id) {
          finishEditing();
        }
        formMessage.textContent = "Task deleted successfully.";
      } catch (error) {
        console.error("Unable to delete task:", error);
        formMessage.textContent = "Unable to delete the task. Please try again.";
      }
    });

    cancelEditButton.addEventListener("click", function () {
      finishEditing();
      formMessage.textContent = "Edit cancelled.";
    });
  },
);

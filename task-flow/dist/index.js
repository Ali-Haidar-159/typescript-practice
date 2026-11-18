var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dataStore, deleteData, openDB, readData } from "./DB/indexDB.js";
function handleSubmit(ee, taskForm, existingTask) {
    var _a, _b;
    ee.preventDefault();
    const form = new FormData(taskForm);
    const titleValue = form.get("title");
    const descriptionValue = form.get("description");
    const departmentValue = form.get("department");
    const userValue = form.get("user");
    const statusValue = form.get("status");
    if (typeof titleValue !== "string" ||
        typeof descriptionValue !== "string" ||
        typeof departmentValue !== "string" ||
        typeof userValue !== "string" ||
        (statusValue !== "completed" && statusValue !== "not-completed")) {
        return;
    }
    const task = {
        id: (_a = existingTask === null || existingTask === void 0 ? void 0 : existingTask.id) !== null && _a !== void 0 ? _a : Date.now().toString(),
        title: titleValue,
        description: descriptionValue,
        department: departmentValue,
        status: statusValue,
        user: {
            id: (_b = existingTask === null || existingTask === void 0 ? void 0 : existingTask.user.id) !== null && _b !== void 0 ? _b : `user_${Date.now().toString()}`,
            name: userValue,
        },
    };
    return task;
}
function renderTasks(tasks, taskList, taskCount) {
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
        actions.append(createTaskAction("edit", task.id, "Edit"), createTaskAction("delete", task.id, "Delete"));
        card.append(actions);
        taskList.append(card);
    }
}
function createTaskAction(action, taskId, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `task-action task-action--${action}`;
    button.dataset.action = action;
    button.dataset.taskId = taskId;
    button.textContent = label;
    return button;
}
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const taskForm = document.getElementById("task-form");
        const taskList = document.getElementById("task-list");
        const taskCount = document.getElementById("task-count");
        const formMessage = document.getElementById("form-message");
        const submitButton = taskForm.querySelector('button[type="submit"]');
        const cancelEditButton = document.getElementById("cancel-edit");
        const titleInput = document.getElementById("title");
        const departmentInput = document.getElementById("department");
        const descriptionInput = document.getElementById("description");
        const userInput = document.getElementById("user");
        const statusSelect = document.getElementById("status");
        let db;
        let tasks;
        let editingTaskId = null;
        function finishEditing() {
            editingTaskId = null;
            taskForm.reset();
            submitButton.textContent = "Create task";
            cancelEditButton.hidden = true;
        }
        try {
            db = yield openDB("Task_DB", "tasks");
            tasks = yield readData(db);
            renderTasks(tasks, taskList, taskCount);
        }
        catch (error) {
            console.error("Unable to load tasks:", error);
            formMessage.textContent = "Unable to load tasks. Please refresh the page.";
            return;
        }
        taskForm.addEventListener("submit", function (ee) {
            return __awaiter(this, void 0, void 0, function* () {
                const existingTask = tasks.find((task) => task.id === editingTaskId);
                const task = handleSubmit(ee, taskForm, existingTask);
                if (!task) {
                    formMessage.textContent = "Please enter valid task details.";
                    return;
                }
                try {
                    yield dataStore(db, task);
                    tasks = yield readData(db);
                    renderTasks(tasks, taskList, taskCount);
                    finishEditing();
                    formMessage.textContent = "Task saved successfully.";
                }
                catch (error) {
                    console.error("Unable to save task:", error);
                    formMessage.textContent = "Unable to save the task. Please try again.";
                }
            });
        });
        taskList.addEventListener("click", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(event.target instanceof Element)) {
                    return;
                }
                const button = event.target.closest("button[data-action][data-task-id]");
                const action = button === null || button === void 0 ? void 0 : button.dataset.action;
                const taskId = button === null || button === void 0 ? void 0 : button.dataset.taskId;
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
                    yield deleteData(db, task.id);
                    tasks = yield readData(db);
                    renderTasks(tasks, taskList, taskCount);
                    if (editingTaskId === task.id) {
                        finishEditing();
                    }
                    formMessage.textContent = "Task deleted successfully.";
                }
                catch (error) {
                    console.error("Unable to delete task:", error);
                    formMessage.textContent = "Unable to delete the task. Please try again.";
                }
            });
        });
        cancelEditButton.addEventListener("click", function () {
            finishEditing();
            formMessage.textContent = "Edit cancelled.";
        });
    });
});
//# sourceMappingURL=index.js.map
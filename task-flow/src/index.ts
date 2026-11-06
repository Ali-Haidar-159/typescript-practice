import type { Task } from "./model/task";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  if (!(form instanceof HTMLFormElement)) {
    throw new Error("Could not find the task form.");
  }

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(form);

    const titleValue = formData.get("title");
    const descriptionValue = formData.get("description");
    const userValue = formData.get("user");
    const statusValue = formData.get("status");

    console.log(titleValue);
    console.log(descriptionValue);
    console.log(userValue);
    console.log(statusValue);

    if (
      typeof titleValue !== "string" ||
      typeof descriptionValue !== "string" ||
      typeof userValue !== "string" ||
      (statusValue !== "true" && statusValue !== "false")
    ) {
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: titleValue,
      description: descriptionValue,
      user: {
        id: `user_${Date.now().toString()}`,
        name: userValue,
      },
      completed: statusValue === "true",
    };

    try {
      const response = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("The server could not save the task.");
      }

      form.reset();
    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Could not save the task. Please try again.");
    }
  });
});

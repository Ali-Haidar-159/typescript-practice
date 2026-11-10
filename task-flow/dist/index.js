document.addEventListener("DOMContentLoaded", function (e) {
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", function (ee) {
        ee.preventDefault();
        const form = new FormData(taskForm);
        const id = Date.now().toString();
        const titleValue = form.get("title");
        const descriptionValue = form.get("description");
        const departmentValue = form.get("department");
        const userValue = form.get("user");
        const statusValue = form.get("status");
        // console.log(id);
        // console.log(titleValue);
        // console.log(descriptionValue);
        // console.log(userValue);
        // console.log(statusValue);
        if (typeof titleValue !== "string" ||
            typeof descriptionValue !== "string" ||
            typeof departmentValue !== "string" ||
            typeof userValue !== "string" ||
            (statusValue !== "true" && statusValue !== "false")) {
            return;
        }
        const task = {
            id,
            title: titleValue,
            description: descriptionValue,
            department: departmentValue,
            status: statusValue,
            user: {
                id: `user_${Date.now().toString()}`,
                name: userValue,
            },
        };
        taskForm.reset();
    });
});
export {};
//# sourceMappingURL=index.js.map